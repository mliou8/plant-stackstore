var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart');
var Promo = mongoose.model('Promo');
var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {
    Order.find()
    .populate('userID').exec()
        .then(function(orders) {
            res.json(orders);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    var user,
        cart,
        promo,
        data;

    if(req.body.user === undefined) {
        user = User.create({
            name: req.body.recipient.name,
            address: req.body.recipient.address,
            email: req.body.recipient.email,
            guest: true
        }),
        promo = req.body.promo !== undefined ? Promo.findById(req.body.promo) : undefined;
        
        data = Promise.all([user, promo])
            .spread(function(user, promo) {
                var cart = Cart.create({
                    user: user._id,
                    items: req.body.cart,
                    promo: promo !== undefined ? promo._id : undefined
                });

                return Promise.all([user, cart, promo]);
            })
            .spread(function(user, cart, promo) {
                cart = cart
                    .select('items')
                    .populate('items.product','_id name price');
                return Promise.all([user, cart, promo]);
            })
    } else {
        user = User.findById(req.body.user);
        cart = Cart.findById(req.body.cart)
            .populate('items.product','_id name price')
            .exec();
        promo = req.body.promo !== undefined ? Promo.findById(req.body.promo) : undefined;
        data = Promise.all([user, cart, promo]);
    }
    data
        .spread(function(user, cart, promo) {
            for(var i = 0; i < cart.items.length; i++) {
                if(cart.items[i].quantity > cart.items[i].product.stock) {
                    var err = new Error('Not enough of product #'+cart.items[i].product._id+' to fill order');
                    err.status = 400;
                    throw err;
                }
            }
            var products = Product.decreaseStock(cart.items);
            return Promise.all([user, cart, promo, products]);
        })
        .spread(function(user, cart, promo, products) {
            return Order.create({
                userID: user._id,
                products: cart.items,
                recipient: req.body.recipient,
                promo: promo !== undefined && promo.available ? promo : undefined,
                status: 'pending'
            })
        })
        .then(function(order) {
            res.json(order);
        })
        .then(null, next);
});

router.get('/:id', function(req, res, next) {
    Order.findById(req.params.id).exec()
        .then(function(order) {
            res.json(order);
        })
        .then(null, next);
});

router.put('/:id', function(req, res, next) {
    Order.findById(req.params.id).exec()
        .then(function(order) {
            for(var key in req.body) {
                order[key] = req.body[key];
            }
            return order.save();
        })
        .then(function(order) {
            return Order.findById(order._id);
        })
        .then(function(order) {
            res.json(order);
        })
        .then(null, next);
});

//May come back to this later - route for editing just products
// router.put('/:id/products', function(req, res, next) {
//     Order.findById(req.params.id).exec()
//         .then(function(order) {
//             for(var key in req.body) {
//                 order[key] = req.body[key];
//             }
//             return order.save();
//         })
//         .then(function(order) {
//             return Order.findById(order._id);
//         })
//         .then(function(order) {
//             res.json(order);
//         })
//         .then(null, next);
// });

router.delete('/:id', function(req, res, next) {
    Order.remove({ _id: req.params.id })
        .then(function(order) {
            res.status(204).json(order);
        })
        .then(null, function(err) {
            err.status = 404;
            next(err);
        });
});

module.exports = router;