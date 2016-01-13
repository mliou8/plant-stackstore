var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart');

router.get('/', function(req, res, next) {
    User.find().exec()
        .then(function(users) {
            res.json(users);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    User
        .create(req.body)
        .then(function(user) {
            var cart = Cart.create({ user: user._id });
            user.admin = false;
            var userSave = user.save();
            return Promise.all([userSave, cart]);
        })
        .then(function(result) {
            res.status(201).json({ user: result[0], cart: result[1] });
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
            res.json(info);
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
    Order.find({ userId: req.params.id }).exec()
        .then(function(orders) {
            res.json(orders);
        })
        .then(null, next);
});

router.get('/:id/cart', function(req, res, next) {
    Cart
        .findOne({ user: req.params.id })
        // .populate('user items.product')
        .then(function(cart) {
            res.json(cart);
        })
        .then(null, next);
});

router.post('/:id/cart', function(req, res, next) {
    User
        .findById(req.params.id)
        .then(function(user) {
            return Cart.findOne({ user: user._id });
        })
        .then(function(cart) {
            var itemIdx = cart.items.map(function(obj, index) {
                if(obj.product === req.body.product) {
                    return index;
                }
            });

            if(itemIdx) {
                cart.items[itemIdx].quantity += req.body.quantity;
            } else {
                cart.items.push(req.body);
            }

            return cart.save();
        })
        .then(function(cart) {
            console.log(cart,'NOW FINDING SAVED CART');
            return Cart.findById(cart._id);
        })
        .then(function(cart) {
            console.log(cart,'NOW SENDING CART');
            res.status(201).json(cart);
        })
        .then(null, next);
})

router.delete('/:id/cart', function(req, res, next) {
    Cart
        .remove({ user: req.params.id })
        .then(function(data) {
            res.json(data);
        })
        .then(null, next);
})

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