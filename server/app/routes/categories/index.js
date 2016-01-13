var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

//Returns all categories
router.get('/', function(req, res, next) {
    Category.find().exec()
        .then(function(categories) {
            res.send(categories);
        })
        .then(null, next);
});

//Creates a new category
router.post('/', function(req, res, next) {
    Category.create(req.body)
        .then(function(category) {
            res.status(201).json(category);
        })
        .then(null, next);
})

//Returns a category based on the name you passed it
router.get('/:name', function(req, res, next) {
    Category.findOne({name:req.params.name}).exec()
        .then(function(category) {
            res.json(category);
        })
        .then(error, next);
});

//Edits a category based on name
router.put('/:name', function(req, res, next) {
    Category.findOne({name:req.params.name}).exec()
    .then(function (category) {
        category['name'] = req.body.name
        return category.save();
    })
    .then(function (category) {
        return Category.findOne({name:category.name})
    })
    .then(function(category) {
        res.json(category);
    })
    .then(null, next);
})

router.delete('/:name', function(req, res, next) {
    Category.remove({ name: req.params.id })
        .then(function(info) {
            res.status(204).json(info);
        })
        .then(null, function(err) {
            err.status = 404;
            next(err);
        });
});

module.exports = router;