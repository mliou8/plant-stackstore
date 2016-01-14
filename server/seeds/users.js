var mongoose = require('mongoose');

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
 "twitter": "twittertest2",
 "facebook": "fbtest2",
 "google": "testuser2@gmail",
 "admin": false
},
{"email": "testuser3@gmail.com",
 "address": "5 Hanover",
 "password": "secretpassword",
 "salt": "testuser3",
 "twitter": "twittertest3",
 "facebook": "fbtest3",
 "google": "testuser3@gmail",
 "admin": false
},
{"email": "testuser4@gmail.com",
 "address": "10 Hanover",
 "password": "secretpassword",
 "salt": "testuser4",
 "twitter": "twittertest4",
 "facebook": "fbtest4",
 "google": "testuser4@gmail",
 "admin": false
}
];
module.exports = users;

