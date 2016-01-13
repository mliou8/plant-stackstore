var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.get('/', function(req, res, next) {
    Order.find().exec()
        .then(function(orders) {
            res.json(orders);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Order.create(req.body)
        .then(function(order) {
            res.status(201).json(order);
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