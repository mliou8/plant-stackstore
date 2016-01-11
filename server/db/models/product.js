var mongoose = require('mongoose');
var shortid = require('shortid');

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

mongoose.model('Product', schema);