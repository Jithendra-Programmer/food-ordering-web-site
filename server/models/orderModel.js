// importing mongoose
const mongoose = require('mongoose');

// initializing Schema for order
const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customers',
            required: true,
        },
        foodItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'foodItems',
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurants',
            required: true,
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
        quantity: {
            type: Number,
            min: 1,
            default: 1,
            required: true,
        },
    },
    { timestamps: true },
);

// initializing model for order schema
const orderModel = new mongoose.model('orders', orderSchema);

// exporting orders model
module.exports = orderModel;
