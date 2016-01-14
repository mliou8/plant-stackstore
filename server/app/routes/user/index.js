var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');

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
            // ensure new user isn't an admin
            user.admin = false;
            var userSave = user.save();

            // create a new cart with the new user ID
            var cart = Cart.create({
                user: user._id,
                // add items sent from local storage to new cart or initialize items as empty array
                items: req.body.cart ? req.body.cart : []
            });

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
            if(!user) {
                var err = new Error('User #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            }

            res.json(user);
        })
        .then(null, next);
});

router.put('/:id', function(req, res, next) {
    User.findById(req.params.id).exec()
        .then(function(user) {
            if(!user) {
                var err = new Error('User #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            }
            
            for(var key in req.body) {
                // don't let users set themselves as admins
                if(key !== 'admin') {
                    user[key] = req.body[key];
                }
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
    var user = User.remove({ _id: req.params.id });
    var cart = Cart.remove({ user: req.params.id });

    Promise.all([user,cart])
        .then(function(info) {
            res.json({
                user: info[0],
                cart: info[1]
            });
        })
        .then(null, next);
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
        .populate('items.product')
        .then(function(cart) {
            if(!cart) {
                var err = new Error('Cart for '+req.params.id+' not found');
                err.status = 404;
                throw err;
            }
            
            res.json(cart);
        })
        .then(null, next);
});

router.post('/:id/cart', function(req, res, next) {
    Cart
        .findOne({ user: req.params.id })
        .then(function(cart) {
            // validate cart
            if(!cart) {
                var err = new Error('Cart for user #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            }
            // search for product to validate
            var product = Product.findById(req.body.product);
            return Promise.all([cart, product]);
        })
        .then(function(result) {
            var cart = result[0];
            var product = result[1];

            // validate product
            if(!product) {
                var err = new Error('Product #'+req.body.product+' not found');
                err.status = 404;
                throw err;
            }

            //check whether added product is already in cart
            var itemIdx;
            var i = 0;

            while(itemIdx === undefined && i < cart.items.length) {
                if(cart.items[i].product === product._id) {
                    itemIdx = i;
                }
                i++;
            }

            if(itemIdx !== undefined) {
                // if item is already present in cart, add new quantity to quantity in cart (or add 1 if no quantity specified)
                cart.items[itemIdx].quantity += req.body.quantity ? +req.body.quantity : 1;
            } else {
                // if item is not present in cart, push item id & quanitity
                cart.items.push({
                    product: product._id,
                    quantity: req.body.quantity ? +req.body.quantity : 1
                });
            }

            return cart.save();
        })
        .then(function(cart) {
            // find updated cart
            return Cart
                .findById(cart._id)
                .populate('items.product')
                .exec();
        })
        .then(function(cart) {
            res.status(201).json(cart);
        })
        .then(null, next);
})

router.put('/:id/cart', function(req, res, next) {
    Cart.findOne({ user: req.params.id }).exec()
        .then(function(cart) {
            if(!cart) {
                var err = new Error('Cart for user #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            }

            console.log('HERE 1',cart);
            // find location of each product from req.body.items in cart.items
            var itemIdx;
            var k;

            for(var i = 0; i < req.body.items.length; i++) {
                k = 0;
                itemIdx = undefined;
                console.log('HERE 2', req.body.items[i]);

                while(itemIdx === undefined && k < cart.items.length) {
                    if(cart.items[k].product === req.body.items[i].product) {
                        itemIdx = k;
                    }
                }

                // if product is not found in cart, throw error without saving cart
                if(itemIdx === undefined) {
                    var err = new Error('Item #'+req.body.items[i].product+'is not in cart');
                    err.status = 404;
                    throw err;
                }

                if(req.body.items[i].quantity !== 0) {
                    console.log('HERE 3',req.body.items[i].quantity);
                    // set new item quantity to quantity in req.body.items
                    cart.items[itemIdx].quantity = req.body.items[i].quantity;
                    console.log(cart.items[itemIdx].quantity);
                } else {
                    console.log('HERE 4',cart.items[itemIdx]);
                    // if new quantity is zero, delete item
                    cart.items.splice(itemIdx,1);
                    console.log('HERE 7',cart.items);
                }
            }

            return cart.save();
        })
        .then(function(cart) {
            console.log('HERE 5',cart);
            return Cart.findById(cart._id).populate('items.product').exec();
        })
        .then(function(cart) {
            console.log('HERE 6',cart);
            res.json(cart);
        })
        .then(null, next);
});

router.delete('/:id/cart', function(req, res, next) {
    Cart.remove({ user: req.params.id })
        .then(function(info) {
            return User.findById(req.params.id);
        })
        .then(function(user) {
            if(!user) {
                var err = new Error('User #'+req.params.id+' associated with cart does not exist');
                err.status = 404;
                throw err;
            }

            // if there's a user, that user should hav a cart
            // deleting a cart will remove the exisiting cart
            //   and create a fresh one associated with the user
            return Cart.create({ user: user._id });
        })
        .then(function(cart) {
            res.json(cart);
        })
       .then(null, next);
});

module.exports = router;