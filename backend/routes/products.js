const { Product } = require('../models/product');
const { Category } = require('../models/category');
const { Business } = require('../models/business');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })

router.get(`/`, async (req, res) => {

    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({ success: false })
    }
    res.send(product);
})

router.post(`/`, uploadOptions.single('image'), async (req, res) => {

    const business = await Business.findById(req.body.business);
    if (!business) {
        return res.status(400).send('Invalid Business');
    }

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send('Invalid Category');
    }

    const file = req.file;
    if (!file) {
        return res.status(400).send('No image in the request')
    }

    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        business: req.body.business,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    })

    savedProduct = await newProduct.save();

    let updatedBusiness = await Business.findByIdAndUpdate(
        req.body.business,
        {
            $push: {"products": savedProduct._id},
        },
        { new: true}
    )

    updatedBusiness = await business.save();

    if(!updatedBusiness) {
        return res.status(400).send('cannot add product to business!')
    }

    res.send(newProduct);
})

router.put('/:id', uploadOptions.single('image'), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);

    if (!category) {
        return res.status(400).send('Invalid Category');
    }

    const file = req.file;
    if (!file) {
        return res.status(400).send('No image in the request')
    }

    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: `${basePath}${fileName}`,
            brand: req.body.brand,
            business: req.body.business,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews
        },
        { new: true }
    )

    if (!product) {
        return res.status(500).send('the product cannot be updated!')
    }

    res.send(product);
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "product not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

module.exports = router;