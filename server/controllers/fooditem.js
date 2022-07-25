// importing packages
const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

// importing middlewares
const verifyToken = require('../middlewares/verifyToken');
const isRestaurant = require('../middlewares/isRestaurant');
const isRestaurantFoodItem =
    require('../middlewares/isRestaurantFood').isRestaurantFoodItem;

// impoering mongoDB models
const foodModel = require('../models/foodModel');
const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

// initializing router object
const router = express.Router();

// route to create food item
router.post('/createItem', verifyToken, isRestaurant, (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, feilds, files) => {
        if (err === null) {
            let oldpath = files.image.filepath;

            let newImagename =
                files.image.newFilename +
                '.' +
                files.image.originalFilename.split('.')[1];

            let newpath = './images/food/' + newImagename;

            fs.readFile(oldpath, (err, data) => {
                if (err === null) {
                    fs.writeFile(newpath, data, (err) => {
                        if (err === null) {
                            console.log('File stored');
                            fs.unlink(oldpath, (err) => {
                                if (err === null) {
                                    let foodData = feilds;

                                    foodData.pic = newImagename;

                                    const foodItems = new foodModel(foodData);
                                    foodItems
                                        .save()
                                        .then((response) =>
                                            res.status(200).send({
                                                foodItem: response,
                                                message: 'Food Item Created',
                                                success: true,
                                            }),
                                        )
                                        .catch((err) => {
                                            console.log(err);
                                            res.status(400).send({
                                                message:
                                                    'Unable to Create Food Item',
                                                success: false,
                                            });
                                        });
                                } else {
                                    console.log(err);
                                    res.status(400).send({
                                        message: 'unable to create file',
                                    });
                                }
                            });
                        } else {
                            console.log(err);
                            res.status(400).send({
                                message: 'unable to create file',
                            });
                        }
                    });
                } else {
                    console.log(err);
                    res.status(400).send({
                        message: 'Unable to Create food item',
                        success: false,
                    });
                }
            });
        } else {
            console.log(err);
            res.status(500).send({
                message: 'Unable to Create Food Item',
                success: false,
            });
        }
    });
});

// route to get the image of the food item
router.get('/image/:filename', (req, res) => {
    res.download('./images/food/' + req.params.filename);
});

// route to update the food item
router.put(
    '/updateItem/:id',
    verifyToken,
    isRestaurant,
    isRestaurantFoodItem,
    (req, res) => {
        let updatedData = req.body;
        let _id = req.params.id;

        foodModel
            .updateOne({ _id }, updatedData)
            .then(() =>
                res.status(200).send({
                    message: 'data is updated',
                    success: true,
                }),
            )
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: 'Unable to update food items',
                    success: false,
                });
            });
    },
);

// route to update image of the food item

router.put(
    '/updateFoodImage/:id',
    verifyToken,
    isRestaurant,
    isRestaurantFoodItem,
    (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err === null) {
                console.log('req came');
                const foodItem = await foodModel.findOne({
                    _id: req.params.id,
                });
                let oldFilePath = `./images/food/${foodItem.pic}`;

                let oldpath = files.image.filepath;

                let newImagename =
                    files.image.newFilename +
                    '.' +
                    files.image.originalFilename.split('.')[1];

                let newpath = './images/food/' + newImagename;

                fs.readFile(oldpath, (err, data) => {
                    if (err === null) {
                        fs.writeFile(newpath, data, (err) => {
                            if (err === null) {
                                console.log('File stored');

                                fs.unlink(oldpath, (err) => {
                                    if (err === null) {
                                        console.log('file saved');
                                        fs.unlink(oldFilePath, (err) => {
                                            if (err === null) {
                                                console.log('file removed');
                                                foodModel
                                                    .updateOne(
                                                        { _id: req.params.id },
                                                        { pic: newImagename },
                                                    )
                                                    .then(() => {
                                                        console.log(
                                                            'data updated',
                                                        );
                                                        res.status(200).send({
                                                            fileName:
                                                                newImagename,
                                                            message:
                                                                'Food Item Created',
                                                            success: true,
                                                        });
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                        res.status(400).send({
                                                            message:
                                                                'Unable to Create food item',
                                                            success: false,
                                                        });
                                                    });
                                            } else {
                                                console.log(err);
                                                res.status(400).send({
                                                    message:
                                                        'Unable to Create food item',
                                                    success: false,
                                                });
                                            }
                                        });
                                    } else {
                                        console.log(err);
                                        res.status(400).send({
                                            message: 'unable to create file',
                                        });
                                    }
                                });
                            } else {
                                console.log(err);
                                res.status(400).send({
                                    message: 'unable to create file',
                                });
                            }
                        });
                    } else {
                        console.log(err);
                        res.status(400).send({
                            message: 'Unable to Create food item',
                            success: false,
                        });
                    }
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: 'Unable to update image Food Item',
                    success: false,
                });
            }
        });
    },
);

// route to delete the food item
router.delete(
    '/deleteItem/:id',
    verifyToken,
    isRestaurant,
    isRestaurant,
    async (req, res) => {
        let _id = req.params.id;

        const orders = await orderModel.find({ foodItem: _id });
        const cartItems = await cartModel.find({ foodItem: _id });

        foodModel
            .deleteOne({ _id })
            .then(() => {
                if (orders.length !== 0)
                    orders.map((order) => {
                        orderModel
                            .deleteOne({ _id: order._id })
                            .then(() => null)
                            .catch((err) => {
                                console.log(err);
                                res.status(400).send({
                                    message: 'Unable to delete',
                                    success: false,
                                });
                            });
                    });

                if (cartItems.length !== 0) {
                    cartItems.map((cartItem) => {
                        cartModel
                            .deleteOne({ _id: cartItem._id })
                            .then(() => null)
                            .catch((err) => {
                                console.log(err);
                                res.status(400).send({
                                    message: 'Unable to delete',
                                    success: false,
                                });
                            });
                    });
                }

                res.status(200).send({
                    message: 'Food Item deleted!!',
                    success: true,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: 'Unable to delete',
                    success: false,
                });
            });
    },
);

// route to get all the food items
router.get('/getItems', async (req, res) => {
    const foodItems = await foodModel.find().populate('restaurant');

    res.send(foodItems);
});

// route to get signal food item
router.get('/getItems/:id', verifyToken, async (req, res) => {
    let _id = req.params.id;
    const foodItems = await foodModel.findOne({ _id }).populate('restaurant');
    res.status(200).send(foodItems);
});

// exporting router object
module.exports = router;
