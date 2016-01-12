var mongoose = require('mongoose');
var shortid = require('shortid');

var schema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },

    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],

    date: {
        type: Date,
        default: Date.now
        required: true
    },

    status: {
        type: String,
        required: true
    }
});



mongoose.model('Order', schema);

Order.schema.path('status').validate(function (value) {
  return /pending|completed|delivered|shipped/i.test(value);
}, 'Invalid Order Status');