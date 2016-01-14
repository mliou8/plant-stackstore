var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');


var carts = [
{
    user: "",
    items: [
        {
            product: null,
            quantity: 2
        },
        {
            product: null,
            quantity: 1
        }
    ]
}
];

module.exports = carts;

