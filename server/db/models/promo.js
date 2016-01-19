var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    product: {
        type: String,
        ref: 'Product'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    appliesTo: {
        type: String,
        required: true,
        enum: ['all', 'product', 'category'],
        default: 'all'
    },
    discount: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    expires: {
        type: Date,
        default: function(){
            return +new Date() + 7*24*60*60*1000
        }
    }
});

mongoose.model('Promo', schema);