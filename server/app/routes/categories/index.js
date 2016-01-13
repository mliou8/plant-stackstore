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
router.get('/:id', function(req, res, next) {
    Category.findOne({_id:req.params.id}).exec()
        .then(function(category) {
            //now we have a category and we need to find all the products
            Product.find({category: $category._id})
            .then(function(products){
                console.log(products.name);
            })

            // res.json(category);
        })
        .then(null, next);
});

//Edits a category based on name
router.put('/:id', function(req, res, next) {
    Category.findOne({_id:req.params.id}).exec()
    .then(function (category) {
        category.name = req.body.name
        return category.save();
    })
    .then(function (category) {
        return Category.findOne({_id:category.id})
    })
    .then(function(category) {
        res.json(category);
    })
    .then(null, next);
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