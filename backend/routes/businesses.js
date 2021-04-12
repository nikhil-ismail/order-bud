const { Business } = require('../models/business');
const { Category } = require('../models/category');
const { User } = require('../models/user');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

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
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadOptions = multer({ storage: storage });
const multipleFieldUpload = uploadOptions.fields([{ name: "profilePhoto" }, { name: "coverPhoto" }]);

router.get(`/`, async (req, res) => {
    const businessList = await Business.find()
    .populate('categories', 'name')

    if (!businessList) {
        res.status(500).json({ success: false })
    }
    
    res.status(200).send(businessList);
})

router.get('/:userId', async (req, res) => {
    const user = await User.findById(mongoose.Types.ObjectId(req.params.userId));
    let business;

    if (user.isAdmin) {
        business = await Business.findOneAndUpdate(
            { "owner": req.params.userId },
            {   },
            { upsert: true, new: true }
        )
        .populate('categories', {
            'name': 1,
            "_id": 0
        })

        if (!business) {
            return res.status(500).json({ message: 'The business with the given ID was not found.' })
        }

        return res.status(200).send(business);
    }
    
    return res.status(500).send({msg: "You are not a store owner"})
})

router.post('/', multipleFieldUpload, async (req, res) => {
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let coverPhotoPath;

    if (req.files.coverPhoto) {
        coverPhotoPath = `${basePath}${req.files.coverPhoto[0].filename}`;
    } else {
        coverPhoto = null;
    }

    let business = new Business({
        coverImage: coverPhotoPath,
        name: req.body.name,
        address: req.body.address,
        delivery: req.body.delivery,
        pickup: req.body.pickup,
        categories: req.body.categories,
        rating: req.body.rating
    })

    business = await business.save();

    if (!business) {
        return res.status(400).send('the business cannot be created!')
    }

    res.status(200).send(business);
})

router.put('/:id', multipleFieldUpload, async (req, res) => {
    
    standardizedCategories = req.body.categories.map(category => {
        return category.substr(0, 1).toUpperCase() + category.substr(1).toLowerCase();
    })

    const categories = Promise.all(standardizedCategories.map(async category => {
        let checkCategory = await Category.findOneAndUpdate(
            { "name": category },
            {  },
            { upsert: true, new: true }
        )

        return mongoose.Types.ObjectId(checkCategory._id);
    }))

    const categoriesResolved = await categories;

    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let coverPhotoPath = req.body.coverPhoto;

    if (req.files && req.files.coverPhoto) {
        coverPhotoPath = `${basePath}${req.files.coverPhoto[0].filename}`;
    }

    const business = await Business.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
            coverImage: coverPhotoPath,
            name: req.body.name,
            address: req.body.address,
            delivery: req.body.delivery,
            pickup: req.body.pickup,
            categories: categoriesResolved,
            rating: req.body.rating
        },
        { new: true }
    )

    if (!business) {
        return res.status(400).send('the business cannot be updated!')
    }

    res.send(business);
})

router.delete('/:id', (req, res) => {
    Business.findByIdAndRemove(req.params.id).then(business => {
        if (business) {
            return res.status(200).json({ success: true, message: 'the business is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "business not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

module.exports = router;