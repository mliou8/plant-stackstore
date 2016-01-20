var mongoose = require('mongoose');
var shortid = require('shortid');
var random = require('mongoose-random');
var Promise = require('bluebird');


var schema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: [String] // e.g. 'picture.jpg'
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }]
    }
});

schema.statics.decreaseStock = function(items) {
    var self = this;
    var products = items.map(function(item) {
        console.log('item',item);
        return self
            .findById(item.product._id)
            .then(function(product) {
                product.stock -= item.quantity;
                return product.save();
            })
    })
    return Promise.all(products)
        .then(function(products) {
            return products;
        })
        .then(null, function(err) {
            var newErr = new Error(err.message);
            newErr.name = err.name;
            newErr.status = 400;

            throw newErr;
        })
}

schema.plugin(random, { path: 'r' }); // by default `path` is `random`. It's used internally to store a random value on each doc.

mongoose.model('Product', schema);