const { Business } = require('../models/business');
const { Product } = require('../models/product');
const { Category } = require('../models/category');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
    .populate({ 
        path: 'products', populate: {
            path : 'category', select: 'name'
        }
    })
    .populate({
        path: 'products', populate: {
            path : 'business', select: 'name'
        }
    });

    if (!businessList) {
        res.status(500).json({ success: false })
    }
    
    res.status(200).send(businessList);
})

router.get('/:id', async (req, res) => {
    const business = await Business.find()
    .populate('categories', 'name')
    .populate({ 
        path: 'products', populate: {
            path : 'category', select: 'name'
        }
    });

    if (!business) {
        res.status(500).json({ message: 'The business with the given ID was not found.' })
    }
    res.status(200).send(business);
})

router.post('/', multipleFieldUpload, async (req, res) => {
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let coverPhotoPath, profilePhotoPath;

    if (req.files.coverPhoto) {
        coverPhotoPath = `${basePath}${req.files.coverPhoto[0].filename}`;
    } else {
        coverPhoto = null;
    }

    if (req.files.profilePhoto) {
        profilePhotoPath = `${basePath}${req.files.profilePhoto[0].filename}`;
    } else {
        profilePhoto = null;
    }

    let business = new Business({
        name: req.body.name,
        address: req.body.address,
        coverImage: coverPhotoPath,
        profileImage: profilePhotoPath,
        rating: req.body.rating,
        categories: req.body.categories,
        dateCreated: req.body.dateCreated
    })

    business = await business.save();

    if (!business) {
        return res.status(400).send('the business cannot be created!')
    }

    res.send(business);
})

router.put('/:id', multipleFieldUpload, async (req, res) => {
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let coverPhotoPath;
    let profilePhotoPath;

    if (req.files.coverPhoto) {
        coverPhotoPath = `${basePath}${req.files.coverPhoto[0].filename}`;
    } else {
        coverPhoto = req.body.coverPhoto;
    }

    if (req.files.profilePhoto) {
        profilePhotoPath = `${basePath}${req.files.profilePhoto[0].filename}`;
    } else {
        profilePhoto = req.body.profilePhoto;
    }

    const business = await Business.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            address: req.body.address,
            coverImage: coverPhotoPath,
            profileImage: profilePhotoPath,
            rating: req.body.rating,
            categories: req.body.categories,
            dateCreated: req.body.dateCreated
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