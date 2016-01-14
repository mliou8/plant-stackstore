var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

var schema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    text: {
        type: String
    },
    product: {
        type: String,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Review', schema);