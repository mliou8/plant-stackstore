var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');


var testCart = new Cart({

});

var users = [
{"email": "testuser@gmail.com",
 "address": "224 Burns St",
 "password": "secretpassword",
 "salt": "testuser",
 "twitter": "emches",
 "facebook": "emilyches",
 "google": "testuser@gmail",
 "admin": false
},
{"email": "testuser2@gmail.com",
 "address": "1 Burns St",
 "password": "secretpassword",
 "salt": "testuser",
 "twitter": "emches",
 "facebook": "emilyches",
 "google": "testuser2@gmail",
 "admin": false
}
];
module.exports = users;

