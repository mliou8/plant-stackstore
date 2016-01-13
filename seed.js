/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var random = require('mongoose-random');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db/index.js');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Cart = Promise.promisifyAll(mongoose.model('Cart'));

var categoryData =require('./server/seeds/categories.js')
var productData =require('./server/seeds/products.js')
var userData =require('./server/seeds/users.js')
var cartData =require('./server/seeds/cart.js')

// Category
// User
// Product (has categories)
// Cart (has users, products)
// Orders (has users, products)
// Review (has users, products)


function seedProduct (productData) {
   var promises = []
   productData.forEach(function(product){
     promises.push(Product.create(product))
   })
   return Promise.all(promises)
}


function seedCategories (categoryData) {
   var promises = []
   categoryData.forEach(function(cat){
     promises.push(Category.create(cat))
   })
   return Promise.all(promises)
}

function seedUser (userData) {
   var promises = []
   userData.forEach(function(user){
     promises.push(User.create(user))
   })
   return Promise.all(promises)
}

function seedCart (cartData) {
   var promises = []
   var cartCount = 0
   while(cartCount<5){
    var cartData = {userID: null , items: []};
    User.findRandom().limit(1).exec()
        .then(function(user){
             cartData.userID = user[0]._id
             return user
        })
        .then(function(){
            Product.findRandom().limit(4).exec()
                .then(function(products){
                    for (i = 0 ; i < 4; i++){
                        cartData.items[i] = {};
                        cartData.items[i].product = products[i]._id
                        cartData.items[i].quantity = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                    }
                    promises.push(Cart.create(cartData))
                })
        })
    cartCount++
   }
   return Promise.all(promises)
}

 var randomUsers = [];
 var randomProducts = []
//Promise.all to save all the different seeds
connectToDb.then(function () {
        return Promise.all([Category.remove({}),Product.remove({}),User.remove({})])
    })
    .then(function () {
        return seedCategories(categoryData);
    })
    .then(function () {
        return seedUser(userData);
    })
    .then(function(){

                return seedProduct(productData);

    })
    .then(function () {
        User.findRandom().limit(10).exec(function (err, users) {
         console.log("found users", users);
            randomUsers = users;
            console.log("new users", randomUsers)
            return users
         })
        .then(function(){
             return seedCart(cartData)
         })

        })
    .then(function(){
         console.log('Seeding successful')
    })


// connectToDb.then(function () {
//     User.findAsync({}).then(function (users) {
//         if (users.length === 0) {
//             return seedUsers();
//         } else {
//             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function () {
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });

// var seedUsers = function () {

//     var users = [
//         {
//             email: 'testing@fsa.com',
//             password: 'password'
//         },
//         {
//             email: 'obama@gmail.com',
//             password: 'potus'
//         }
//     ];

//     return User.createAsync(users);

// };
