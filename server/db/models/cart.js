var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

mongoose.model('Cart', schema);