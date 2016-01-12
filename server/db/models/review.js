var mongoose = require('mongoose');

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
        type: Schema.Types.ObjectID,
        ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
});

mongoose.model('Review', schema);