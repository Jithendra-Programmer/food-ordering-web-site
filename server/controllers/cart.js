// importing packages
const express = require('express');

// importing middlewares
const verifyToken = require('../middlewares/verifyToken');

// importing mongoDB models
const cartModel = require('../models/cartModel');
const foodModel = require('../models/foodModel');
const orderModel = require('../models/orderModel');

// initializing router Object
const router = express.Router();

// route to add an item to cart
router.post('/addItem', verifyToken, async (req, res) => {
    let data = req.body;
    // console.log(data);

    const cartItems = new cartModel(data);
    cartItems
        .save()
        .then(() => {
            res.status(200).send({
                message: 'Item is added to cart',
                success: true,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: 'Unable to addItem to Cart',
                success: false,
            });
        });
});

// route to delete an item from cart
router.delete('/deleteItem/:id', verifyToken, async (req, res) => {
    let _id = req.params.id;
    cartModel
        .deleteOne({ _id })
        .then(() =>
            res
                .status(200)
                .send({ message: 'Cart Item delted!!!', success: true }),
        )
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: 'unable to delte cart item',
                success: false,
            });
        });
});

// route to update an item from cart
router.put('/updateItem/:id', verifyToken, (req, res) => {
    let _id = req.params.id;
    let updatedData = req.body;
    cartModel
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
                message: 'Unable to update cart items',
                success: false,
            });
        });
});

// route to check out the food items in cart
router.post('/checkOut', verifyToken, async (req, res) => {
    let cartItems = req.body.cartItems;

    cartItems.map(async (cart, index) => {
        let foodId = cart.foodItem;
        let foodItem = await foodModel.findOne({ _id: foodId });

        if (foodItem.quantity > 0) {
            let orderData = {
                customer: cart.customer,
                foodItem: foodId,
                restaurant: foodItem.restaurant,
                quantity: cart.quantity,
            };
            const orders = new orderModel(orderData);
            orders
                .save()
                .then(async () => {
                    await cartModel.deleteOne({ _id: cart });
                    await foodModel.updateOne(
                        { _id: foodId },
                        { quantity: foodItem.quantity - orderData.quantity },
                    );
                    if (cartItems.length === index + 1) {
                        res.status(200).send({
                            message: 'Ordered!!!',
                            success: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send({
                        message: 'order Rejected!!!',
                        success: false,
                    });
                });
        } else {
            res.status(400).send({
                message: 'Order rejected, Out of Stock',
                success: false,
            });
        }
    });
});

// exporting router object
module.exports = router;
