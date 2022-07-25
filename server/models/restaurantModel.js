// importing mongoose
const mongoose = require('mongoose');

// initializing Schema for restaurant
const restaurantSchema = new mongoose.Schema(
    {
        restaurantName: { type: String, required: true },
        address: { type: String, required: true },
        openingTime: { type: String, required: true },
        closingTime: { type: String, required: true, default: 'none' },
        password: { type: String, required: true },
        role: { type: String, default: 'restaurant', enum: 'restaurant' },
        pic: { type: String, required: true },
    },
    { timestamps: true },
);

// initializing model for restaurant schema
const restaurantModel = new mongoose.model('restaurants', restaurantSchema);

// exporting restaurants model
module.exports = restaurantModel;
