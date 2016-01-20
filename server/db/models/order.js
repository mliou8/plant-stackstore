var mongoose = require('mongoose');
var shortid = require('shortid');

var schema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [{
        product: {
            type : mongoose.Schema.Types.Mixed,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    recipient: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },

    promo: {
        type: mongoose.Schema.Types.Mixed,
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['pending','completed','delivered','shipped'  ]
    }
});



mongoose.model('Order', schema);
