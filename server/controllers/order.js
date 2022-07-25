// importing packages
const express = require('express');

// importing middlewares
const verifyToken = require('../middlewares/verifyToken');
const isRestaurant = require('../middlewares/isRestaurant');
const isRestaurantOrder =
    require('../middlewares/isRestaurantFood').isRestaurantOrder;

// importing mongoDB models
const orderModel = require('../models/orderModel');
const foodModel = require('../models/foodModel');

// initializing router Object
const router = express.Router();

// route to order an food item
router.post('/create', verifyToken, async (req, res) => {
    let orderData = req.body;

    let foodItem = await foodModel.findOne({ _id: orderData.foodItem });

    let quantity = foodItem.quantity;
    if (quantity > 0) {
        const orders = new orderModel(orderData);
        orders
            .save()
            .then(async () => {
                await foodModel.updateOne(
                    { _id: orderData.foodItem },
                    { quantity: quantity - orderData.quantity },
                );

                res.status(200).send({ message: 'Ordered!!!', success: true });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: 'Order rejected',
                    success: false,
                });
            });
    } else {
        res.status(400).send({
            message: 'Order rejected, Out of Stock',
            status: false,
        });
    }
});

// route to update the order
router.put(
    '/changeStatus/:id',
    verifyToken,
    isRestaurant,
    isRestaurantOrder,
    async (req, res) => {
        let _id = req.params.id;
        let updatedData = req.body;

        if (updatedData.orderStatus === 'rejected') {
            let foodItem = await foodModel.findOne({
                _id: updatedData.foodItem,
            });

            await foodModel.updateOne(
                { _id: updatedData.foodItem },
                { quantity: foodItem.quantity + updatedData.quantity },
            );
        }

        orderModel
            .updateOne({ _id }, { orderStatus: updatedData.orderStatus })
            .then(async () => {
                if (updatedData.orderStatus === 'rejected') {
                    let foodItem = await foodModel.findOne({
                        _id: updatedData.foodItem,
                    });

                    let quantity = foodItem.quantity + updatedData.quantity;

                    foodModel
                        .updateOne(
                            { _id: updatedData.foodItem },
                            {
                                quantity,
                            },
                        )
                        .then(() =>
                            res.status(200).send({
                                message: `order ${updatedData.orderStatus}`,
                                success: true,
                            }),
                        )
                        .catch((err) => console.log(err));
                } else {
                    res.status(200).send({
                        message: `order ${updatedData.orderStatus}`,
                        success: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: `unable to change the status of order`,
                    success: false,
                });
            });
    },
);

// route to delete the order
router.delete('/cancelOrder/:id', verifyToken, (req, res) => {
    let _id = req.params.id;
    orderModel
        .deleteOne({ _id })
        .then(() =>
            res.status(200).send({ message: 'Order Canceled', success: true }),
        )
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: 'Unable to cancel order',
                success: false,
            });
        });
});

// exporting router Object
module.exports = router;
