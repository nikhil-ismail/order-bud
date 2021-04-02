const { Product } = require('../models/product');
const { Category } = require('../models/category');
const { Business } = require('../models/business');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query.searchTerm;

    Product.aggregate([
        {
            $lookup: {
                from: Category.collection.name,
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $match: {
                "category.name": { $regex : new RegExp(query, "i") }
            }
        },
        {
            $sort: {
                "rating": -1,
            }
        }
    ])
    .exec((err, categoryMatches) => {
        if (err) {
            res.send(500).send({msg: "Unable to reconcile categories"});
        }

        Product.aggregate([
            {
                $match: {
                    "brand": { $regex : new RegExp(query, "i") }
                }
            },
            {
                $sort: {
                    "rating": -1
                }
            }
        ])
        .exec((err, brandMatches) => {
            if (err) {
                res.send(500).send({msg: "Unable to reconcile brands"});
            }

            Product.aggregate([
                {
                    $match: {
                        "name": { $regex : new RegExp(query, "i") }
                    }
                },
                {
                    $sort: {
                        "rating": -1
                    }
                }
            ])
            .exec((err, productMatches) => {
                if (err) {
                    res.send(500).send({msg: "Unable to reconcile product names"});
                }

                Business.aggregate([
                    {
                        $match: {
                            "name": { $regex : new RegExp(query, "i") }
                        }
                    },
                    {
                        $sort: {
                            "rating": -1
                        }
                    }
                ])
                .exec((err, businessMatches) => {
                    if (err) {
                        res.send(500).send({msg: "Unable to reconcile business names"});
                    }

                    return res.status(200).send({
                        categoryMatches,
                        brandMatches,
                        productMatches,
                        businessMatches
                    })
                })
            })
        })
    })
})

router.get('/category', (req, res) => {
    const query = req.query.category;

    Product.aggregate([
        {
            $lookup: {
                from: Category.collection.name,
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $match: {
                "category.name": query
            }
        }
    ]).exec((err, matches) => {
        if (err) {
            res.send(500).send({msg: "Unable to reconcile categories"});
        }
        res.status(200).send(matches);
    });
})

module.exports = router;