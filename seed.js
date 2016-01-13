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
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db/index.js');
// var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var seedCats =require('./server/seeds/categories.js')
var seedProducts =require('./server/seeds/products.js')

function seedProduct (seedProducts) {
   var promises = []
   seedProducts.forEach(function(product){
     promises.push(Product.create(product))
   })
   return Promise.all(promises)
}


function seedCategories (seedCats) {
   var promises = []
   seedCats.forEach(function(cat){
     promises.push(Category.create(cat))
   })
   return Promise.all(promises)
}

//Promise.all to save all the different seeds
connectToDb.then(function () {
        return Promise.all([Category.remove({}),Product.remove({})])
    })
    .then(function () {
        return seedCategories(seedCats);
    })
    .then(function(){
       return seedProduct(seedProducts);
    })
    .then(function () {
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
