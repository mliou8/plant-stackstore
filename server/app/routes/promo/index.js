var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('lodash');
var Promo = mongoose.model('Promo');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

router.get('/', function(req, res, next) {
    Promo.find().exec()
        .then(function(promos) {
            res.json(promos);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Promo.create(req.body)
        .then(function(promo) {
            res.json(promo);
        })
        .then(null, next);
});

router.get('/:code', function(req, res, next) {
    Promo.findOne({ code: req.params.code })
    .then(function(promo) {
        if(!promo) {
            var err = new Error('Promo code '+req.params.code+' not found');
            err.status = 404;
            throw err;
        }

        res.json(promo);
    })
    .then(null, next);
})

router.put('/:id', function(req, res, next) {
    Promo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(function(promo) {
        res.json(promo);
    })
    .then(null, next);

})

router.delete('/:id', function(req, res, next) {
    Promo.remove({ _id: req.params.id })
        .then(function(info) {
            res.json(info);
        })
        .then(null, next);
})

module.exports = router;