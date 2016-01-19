var mongoose = require('mongoose');

var users = [
{
 "name": "Carol Flynn",
 "email": "testuser@gmail.com",
 "imageURL": "http://www.imagesource.com/Doc/IS0/Media/TRMisc/4/4/f/c/IS29AH8P.png",
 "address": "224 Burns St",
 "password": "secretpassword",
 "salt": "testuser",
 "twitter": "emches",
 "facebook": "emilyches",
 "google": "testuser@gmail",
 "admin": false
},
{
 "name": "Bobby Hanover",
 "email": "testuser2@gmail.com",
 "imageURL": "http://s3.gomedia.us/wp-content/uploads/2013/08/image20.png",
 "address": "1 Burns St",
 "password": "secretpassword",
 "salt": "testuser",
 "twitter": "twittertest2",
 "facebook": "fbtest2",
 "google": "testuser2@gmail",
 "admin": false
},
{
 "name": "Sasha Resnikov",
 "email": "testuser3@gmail.com",
 "imageURL": "http://s3.gomedia.us/wp-content/uploads/2013/08/image20.png",
 "address": "5 Hanover",
 "password": "secretpassword",
 "salt": "testuser3",
 "twitter": "twittertest3",
 "facebook": "fbtest3",
 "google": "testuser3@gmail",
 "admin": false
},

{
 "name": "Minkus Pinkus",
 "email": "testuser4@gmail.com",
 "imageURL": "http://s3.gomedia.us/wp-content/uploads/2013/08/image20.png",
 "address": "10 Hanover",
 "password": "secretpassword",
 "salt": "testuser4",
 "twitter": "twittertest4",
 "facebook": "fbtest4",
 "google": "testuser4@gmail",
 "admin": true
}
];
module.exports = users;

