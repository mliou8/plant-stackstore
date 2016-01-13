var mongoose = require('mongoose');
var shortid = require('shortid');
var random = require('mongoose-random');


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
        required: true
    },
    category: {
        type: [String]
    }
});

schema.plugin(random, { path: 'r' }); // by default `path` is `random`. It's used internally to store a random value on each doc.

mongoose.model('Product', schema);