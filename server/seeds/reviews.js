var mongoose = require('mongoose');
var Review = mongoose.model('Review');

var reviews =[
{
    "product": 'Bonsai Tree',
    "rating": 5,
    "text": "Best. Tree. Ever"
}
]
module.exports = reviews;

