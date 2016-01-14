var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart');

router.get('/', function(req, res, next) {
    User.find().exec()
        .then(function(users) {
            // console.log("FOUND USERS", users)
            res.json(users);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.admin = false;
    // var newCart = new Cart({ items: [] });
    // newUser.cart = newCart;

    newUser.save()
        .then(function(user) {
            res.status(201).json(user);
        })
        .then(null, next);
});

router.get('/:id', function(req, res, next) {
    User.findById(req.params.id).exec()
        .then(function(user) {
            res.json(user);
        })
        .then(null, next);
});

router.put('/:id', function(req, res, next) {
    User.findById(req.params.id).exec()
        .then(function(user) {
            for(var key in req.body) {
                user[key] = req.body[key];
            }
            return user.save();
        })
        .then(function(user) {
            return User.findById(user._id);
        })
        .then(function(user) {
            res.json(user);
        })
        .then(null, next);
});

router.delete('/:id', function(req, res, next) {
    User.remove({ _id: req.params.id })
        .then(function(info) {
            res.status(204).json(info);
        })
        .then(null, function(err) {
            err.status = 404;
            next(err);
        });
});

router.get('/:id/reviews', function(req, res, next) {
    Review.find({ user: req.params.id }).exec()
        .then(function(reviews) {
            res.json(reviews);
        })
        .then(null, next);
});

router.get('/:id/orders', function(req, res, next) {
    Order.find({ userID: req.params.id }).exec()
        .then(function(orders) {
            res.json(orders);
        })
        .then(null, next);
});

router.get('/:id/cart', function(req, res, next) {
  User.findById(req.params.id).exec()
    .then(function(user) {
        res.json(user.cart);
    })
    .then(null, next);
});

router.put('/:id/cart', function(req, res, next) {
    User.findById(req.params.id).exec()
        .then(function(user) {
            user.cart.push({
                product: req.body.productId,
                quantity: req.body.quantity
            });

            console.log('user');

            return user.save();
        })
        .then(function(user) {
            return User.findById(user._id).populate({
                path: 'cart',
                populate: { path: 'product' }
            }).exec();
        })
        .then(function(user) {
            res.json(user.cart);
        })
        .then(null, next);
})

module.exports = router;