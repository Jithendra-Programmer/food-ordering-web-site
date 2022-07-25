// middleware to check whether the user is restaurant or customer
const isRestaurant = (req, res, next) => {
    let role = req.user.role;
    if (role == 'restaurant') {
        next();
    } else {
        res.status(400).send({
            message: 'Your are authorized',
            success: false,
        });
    }
};

// exporting middleware
module.exports = isRestaurant;
