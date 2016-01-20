var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        product: {
            type: String,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    promo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promo'
    }
});

mongoose.model('Cart', schema);