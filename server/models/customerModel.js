// importing mongoose
const mongoose = require('mongoose');

// initializing Schema for customer
const customerSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        mobile: { type: Number, required: true },
        mail: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'customer' },
        address: { type: String },
    },
    { timestamps: true },
);

// initializing model for customer Schema
const customerModel = new mongoose.model('customers', customerSchema);

// exporting customer model
module.exports = customerModel;
