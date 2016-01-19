var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
var Promo = mongoose.model('Promo');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next) {
    User.find().exec()
        .then(function(users) {
            // console.log("FOUND USERS", users)
            res.json(users);
        })
        .then(null, next);
});

router.post('/', function(req, res,  next) {
    console.log("trying to post to user", req.body )
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
            return User.findById(user._id).exec();
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
    Review.find({ user: req.params.id })
        .populate('product').exec()
        .then(function(reviews) {
            res.json(reviews);
        })
        .then(null, next);
});

router.get('/:id/orders', function(req, res, next) {
    Order.find({ userID: req.params.id }).exec()
        .then(function(orders) {
            res.json(orders);
        })
        .then(null, next);
});

router.get('/:id/cart', function(req, res, next) {
    Cart
        .findOne({ user: req.params.id })
        .populate('items.product promo')
        .exec()
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
            var promiseArr = [cart];
            for(var i = 0; i < req.body.items.length; i++) {
                promiseArr.push(Product.findById(req.body.items[i].product).exec());
            }

            return Promise.all(promiseArr);
        })
        .then(function(result) {
            var cart = result[0];

            // validate products
            for(var i = 1; i < result.length; i++) {
                if(!result[i]) {
                    var err = new Error('Product #'+req.body.items[i-1].product+' not found');
                    err.status = 404;
                    throw err;
                }
            }

            //check whether added product is already in cart
            var itemIdx;
            var k;

            for(i = 0; i < req.body.items.length; i++) {
                k = 0;
                itemIdx = undefined;

                while(itemIdx === undefined && k < cart.items.length) {
                    if(cart.items[k].product === req.body.items[i].product) {
                        itemIdx = k;
                    }
                    k++;
                }

                if(itemIdx === undefined) {
                    cart.items.push(req.body.items[i]);
                } else if(req.body.items[i].quantity >= 0) {
                   cart.items[itemIdx].quantity += +req.body.items[i].quantity;
                } else {
                    err = new Error('Invalid quantity '+req.body.items[i].quantity+' for product #'+req.body.items[i].product);
                    err.status = 400;
                    throw err;
                }
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
            var promiseArr = [cart];
            for(var i = 0; i < req.body.items.length; i++) {
                promiseArr.push(Product.findById(req.body.items[i].product).exec());
            }

            return Promise.all(promiseArr);
        })
        .then(function(result) {
            var cart = result[0];

            // validate products
            for(var i = 1; i < result.length; i++) {
                if(!result[i]) {
                    var err = new Error('Product #'+req.body.items[i-1].product+' not found');
                    err.status = 404;
                    throw err;
                }
            }

            //check whether added product is already in cart
            var itemIdx;
            var k;

            for(i = 0; i < req.body.items.length; i++) {
                k = 0;
                itemIdx = undefined;

                while(itemIdx === undefined && k < cart.items.length) {
                    if(cart.items[k].product === req.body.items[i].product) {
                        itemIdx = k;
                    }
                    k++;
                }

                if(itemIdx === undefined) {
                    cart.items.push(req.body.items[i]);
                } else {
                    if(req.body.items[i].quantity > 0) {
                        // set new item quantity to quantity in req.body.items
                        cart.items[itemIdx].quantity = req.body.items[i].quantity;
                    } else if(req.body.items[i].quantity === 0) {
                        // if new quantity is zero, delete item
                        cart.items.splice(itemIdx,1);
                    } else {
                        err = new Error('Invalid quantity '+req.body.items[i].quantity+' for product #'+req.body.items[i].product);
                        err.status = 400;
                        throw err;
                    }
                }
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
});

router.delete('/:id/cart', function(req, res, next) {
    Cart.findOneAndUpdate({ user: req.params.id },{ items: [] }, { new: true })
        .then(function(cart) {
            if(!cart) {
                var err = new Error('Cart for user #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            }
            
            res.json(cart);
        })
       .then(null, next);
});

router.get('/:id/promo', function(req, res, next) {
    Cart.findOne({ user: req.params.id })
        .populate('promo')
        .exec()
        .then(function(cart) {
            console.log(cart.promo);
            if(!cart) {
                var err = new Error('Cart for user #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            } else if(cart.promo === null || cart.promo === undefined) {
                err = new Error('No promo associated with user #'+req.params.id+'cart');
                err.status = 404;
                throw err;
            } else if(promo.expires < Date.now()) {
                err = new Error(req.params.code);
                err.status = 410;
                throw err;
            }
            res.json(cart.promo);
        })
        .then(null, next);
})

router.post('/:id/promo', function(req, res, next) {
    var cart = Cart.findOne({ user: req.params.id });
    var promo = Promo.findOne({ code: req.body.code });

    Promise.all([cart, promo])
        .spread(function (cart, promo) {
            if(!promo) {
                var err = new Error('Promo code "'+req.body.code+'" not found');
                err.status = 404;
                throw err;
            } else if(!cart) {
                err = new Error('Cart for user #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            } else if(promo.expires < Date.now()) {
                err = new Error(req.params.code);
                err.status = 410;
                throw err;
            }

            cart.promo = promo._id;
            return Promise.all([cart.save(), promo]);
        })
        .spread(function (cart, promo) {
            res.json(promo);
        })
        .then(null, next);
});

router.delete('/:id/promo', function(req, res, next) {
    Cart.findOneAndUpdate({ user: req.params.id },{ $unset: { promo: 1 }}, { new: true })
        .then(function(cart) {
            if(!cart) {
                err = new Error('Cart for user #'+req.params.id+' not found');
                err.status = 404;
                throw err;
            }
            res.json(cart);
        })
        .then(null, next);
});

module.exports = router;