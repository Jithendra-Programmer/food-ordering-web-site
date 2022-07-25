// importing mongoose
const mongoose = require('mongoose');

// initializing Schema for cart item
const cartSchema = new mongoose.Schema(
    {
        foodItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'foodItems',
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customers',
            required: true,
        },
        quantity: { type: Number, min: 1, required: true, default: 1 },
    },
    { timestamps: true },
);

// initializing model for cart item schema
const cartModel = new mongoose.model('cart', cartSchema);

// exporting cart items model
module.exports = cartModel;
