// importing mongoose
const mongoose = require('mongoose');

// initializing Schema for food item
const foodSChema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true, minlength: 10 },
        pic: { type: String, required: true },
        // rating: { type: Number, required: true, max: 5, min: 0,  },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'restaurants',
        },
    },
    { timestamps: true },
);

// initializing model for food item schema
const foodModel = new mongoose.model('foodItems', foodSChema);

// exporting food items model
module.exports = foodModel;
