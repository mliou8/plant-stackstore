var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

router.get('/', function(req, res, next) {
    Category.find().exec()
        .then(function(categories) {
            res.send(categories);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Category.create(req.body)
        .then(function(category) {
            res.status(201).json(category);
        })
        .then(null, next);
})

router.get('/:id', function(req, res, next) {
    Category.findById(req.params.id).exec()
        .then(function(category) {
            res.json(category);
        })
        .then(null, next);
});

router.put('/:id', function(req, res, next) {

})

router.delete('/:id', function(req, res, next) {
    Category.remove({ _id: req.params.id })
        .then(function(info) {
            res.status(204).json(info);
        })
        .then(null, function(err) {
            err.status = 404;
            next(err);
        });
});

module.exports = router;