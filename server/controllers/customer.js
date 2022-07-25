// importing packages
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// importing mongoDB models
const customerModel = require('../models/customerModel');
const orderModel = require('../models/orderModel');
const cartMOdel = require('../models/cartModel');

// importing middlewares
const verifyToken = require('../middlewares/verifyToken');

// initializing router object
const router = express.Router();

// route to signup customer
router.post('/signup', async (req, res) => {
    let userData = req.body;

    let salt = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(userData.password, salt);

    userData.password = hashedPassword;

    const customers = customerModel(userData);

    customers
        .save()
        .then(() =>
            res
                .status(200)
                .send({ message: 'Customer Created!!', success: true }),
        )
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: 'unable to create customer',
                success: false,
            });
        });
});

// route to login customer
router.post('/login', async (req, res) => {
    let userCred = req.body;

    let user = await customerModel.findOne({
        role: userCred.role,
        username: userCred.username,
    });

    if (user === null) {
        res.status(401).send({
            massage: 'Unable to find user',
            success: false,
        });
    } else {
        const passwordStatus = await bcrypt.compare(
            userCred.password,
            user.password,
        );
        if (passwordStatus) {
            const token = await jwt.sign(userCred, 'random123');
            res.status(200).send({ user, token, success: true });
        } else {
            res.status(401).send({
                message: 'Invalid password',
                success: false,
            });
        }
    }
});

// route to update customer data
router.put('/update/:id', verifyToken, (req, res) => {
    let _id = req.params.id;
    let updatedData = req.body;
    customerModel
        .updateOne({ _id }, updatedData)
        .then(() =>
            res.status(200).send({ message: 'User Updated', success: true }),
        )
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: 'Unable to update user',
                success: false,
            });
        });
});

// route to get orders created by the customer
router.get('/myorders/:id', verifyToken, async (req, res) => {
    let customerid = req.params.id;
    const orders = await orderModel
        .find({ customer: customerid })
        .populate('customer')
        .populate('restaurant')
        .populate('foodItem');

    res.status(200).send(orders);
});

// route to get cart items created by the customer
router.get('/mycart/:id', async (req, res) => {
    let customerid = req.params.id;

    let cartItems = await cartMOdel
        .find({ customer: customerid })
        .populate('foodItem')
        .populate('customer');

    res.status(200).send(cartItems);
});

// exporting router object
module.exports = router;
