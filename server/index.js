// importing packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');

// importing controllers
const customer = require('./controllers/customer');
const restaurant = require('./controllers/restaurant');
const fooditem = require('./controllers/fooditem');
const order = require('./controllers/order');
const cart = require('./controllers/cart');

// mongo atlas culster uri

const uri =
    'mongodb+srv://jithendra:pass123@cluster0.7b8mpf9.mongodb.net/db';

// connection to mongo
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err));

// initializing port and express object
const port = process.env.PORT || 8000;
const app = express();

// using middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => res.send('Hello its working fine'));
app.use('/customer', customer);
app.use('/restaurant', restaurant);
app.use('/food', fooditem);
app.use('/order', order);
app.use('/cart', cart);

// listing to port
app.listen(port, () => console.log(`server is running at port number ${port}`));
