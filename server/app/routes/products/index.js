var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Review = mongoose.model('Review');

//route to get a list of all the products
router.get('/', function(req, res, next){
	Product.find({})
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
})

router.post('/cartlookup', function(req, res, next) {
	var promiseArr = req.body.items.map(function(item) {
		return Product.findById(item.product).exec();
	});
	Promise.all(promiseArr)
		.then(function(products) {
			for(var i = 0; i < products.length; i++) {
				if(!products[i]) {
					var err = new Error('Product #'+req.body.items[i].product+' not found');
					err.status = 404;
					throw err;
				}
			}

			res.json({ items: products });
		})
		.then(null, next);
})

//route to get a single product matching an ID
router.get('/:id', function(req, res, next){
	Product.findOne({_id: req.params.id})
	.populate('category')
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
})

//route to get the reviews of a single product matching an ID
router.get('/reviews/:id', function(req,res,next){
	Product.findOne({_id: req.params.id})
	.then(function(foundProduct){
		Review.find({product: foundProduct._id})
		.populate('user')
		.then(function(reviews){
			res.json(reviews);
		})
	})
	.then(null,next);
})

// //route to create a new product
router.post('/', function(req, res, next){
	Product.create({
		name: req.body.name,
		photo: req.body.photo,
		description: req.body.description,
		price: req.body.price,
		stock: req.body.stock,
	})
	.then(function(created){
		var categories;
		if (typeof req.body.category === "string") {
			categories = req.body.category.split(", ");
		}
		else {
			categories = req.body.category;
		}

		categories.forEach(function(category){
			created.category.push(category);
		})
		created.save()
		.then(function(){
			res.json(created);
		})
	})
	.then(null,next);
})

// //route to update a given product
router.put('/:id', function(req, res, next){
	Product.findById(req.params.id)
	.then(function(product){
		for (var key in req.body){
			product[key] = req.body[key];
		}
		return product.save();
	})
	.then(function(product) {
        return Product.findById(product._id);
    })
    .then(function(product) {
        res.json(product);
    })
    .then(null, next);
})

//route to delete a given product
router.delete('/:id', function(req, res, next){
	Product.remove({ _id: req.params.id })
        .then(function() {
            res.status(204).json("Deleted");
        })
        .then(null, function(err) {
            err.status = 404;
            next(err);
        });
})