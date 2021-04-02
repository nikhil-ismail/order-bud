const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})

router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const accessToken = jwt.sign({ userId: user.id}, process.env.secret);
       
        res.status(200).send({
            auth: true,
            user: {
                id: user.id,
                address: user.address,
                email: user.email,
                isAdmin: user.isAdmin,
                name: user.name,
                phone: user.phone
            },
            accessToken: accessToken
        }) 
    } else {
       res.status(400).send('Password is wrong!');
    }
})

router.post('/register', async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});

    if (userExists) {
        return res.status(400).send('A user with this email already exists');
    }

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        isAdmin: false,
    })
    newUser = await newUser.save();

    if(!newUser) {
        return res.status(400).send('The user cannot be created!');
    }

    const user = await User.findOne({email: req.body.email});
    const accessToken = jwt.sign({ userId: user.id}, process.env.secret);

    res.status(200).send({
        auth: true,
        user: user,
        accessToken: accessToken
    })
})


router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err => {
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports = router;