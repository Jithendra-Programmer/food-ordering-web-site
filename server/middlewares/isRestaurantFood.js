// importing packages
const foodModel = require('../models/foodModel');
const orderModel = require('../models/orderModel');

// middleware to check whether the food item the created by the perticular restaurant or not
const isRestaurantFoodItem = async (req, res, next) => {
    let name = req.user.restaurantName;
    let _id = req.params.id;

    let foodItem = await foodModel.findOne({ _id }).populate('restaurant');
    console.log(foodItem);
    if (name === foodItem.restaurant.restaurantName) {
        next();
    } else {
        res.status(400).send({
            message: 'your not authorized!!',
            success: false,
        });
    }
};

// middleware to check whether the order the related to the perticular restaurant or not
const isRestaurantOrder = async (req, res, next) => {
    let name = req.user.restaurantName;
    let _id = req.params.id;

    let order = await orderModel.findOne({ _id }).populate('restaurant');
    if (name === order.restaurant.restaurantName) {
        next();
    } else {
        res.status(400).send({
            message: 'your not authorized!!',
            success: false,
        });
    }
};

// exporting middlewares
module.exports = { isRestaurantFoodItem, isRestaurantOrder };
