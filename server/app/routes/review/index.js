var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');

router.get('/', function(req, res, next) {
    Review.find()
        .populate('user')
        .populate('product').exec()
        .then(function(reviews) {
            res.json(reviews);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Review.create(req.body)
        .then(function(review) {
            res.status(201).json(review);
        })
        .then(null, next);
})

router.get('/:id', function(req, res, next) {
    Review.findById(req.params.id).exec()
        .populate('user')
        .then(function(review) {
            res.json(review);
        })
        .then(null, next);
});

router.put('/:id', function(req, res, next) {
    Review.findById(req.params.id).exec()
        .then(function(review) {
            for(var key in req.body) {
                review[key] = req.body[key];
            }
            return review.save();
        })
        .then(function(review) {
            return Review.findById(review._id);
        })
        .then(function(review) {
            res.json(review);
        })
        .then(null, next);
})

router.delete('/:id', function(req, res, next) {
    Review.remove({ _id: req.params.id })
        .then(function(info) {
            res.status(204).json(info);
        })
        .then(null, function(err) {
            err.status = 404;
            next(err);
        });
});

module.exports = router;