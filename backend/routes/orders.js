const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get(`/:userId`, async (req, res) => {
    const orderList = await Order.find({ "user": mongoose.Types.ObjectId(req.params.userId)})
    .populate({ 
        path: 'orderItems',
        populate: { 
            path: 'product', 
            select: {
                'name': 1,
                'price': 1
            }
        }
    })
    .populate('user', 'name')
    .populate('business', {
        coverImage: 1,
        name: 1
    })

    if(!orderList) {
        res.status(500).json({success: false})
    }

    console.log(orderList);

    res.send(orderList);
})

router.post('/', async (req,res) => {
    const orderItemsIds = Promise.all(req.body.order.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: mongoose.Types.ObjectId(orderItem.id)
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    const orderItemsIdsResolved = await orderItemsIds;

    let order = new Order({
        business: mongoose.Types.ObjectId(req.body.order.business),
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.order.shippingAddress1,
        phone: req.body.order.phone,
        isDelivery: req.body.order.isDelivery,
        totalPrice: req.body.order.totalPrice,
        totalQuantity: req.body.order.totalQuantity,
        user: mongoose.Types.ObjectId(req.body.order.user),
    })

    order = await order.save();

    if(!order) {
        return res.status(400).send('the order cannot be created!')
    }

    res.send(order);
})


router.put('/:id', async (req, res)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return res.status(400).send('the order cannot be update!')

    res.send(order);
})


router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

router.get(`/get/count`, async (req, res) =>{
    const orderCount = await Order.countDocuments((count) => count)

    if(!orderCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        orderCount: orderCount
    });
})

router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
})



module.exports = router;