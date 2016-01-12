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


function seed () {
    var newProduct = new Product ({
        name: 'Bonsai Tree',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Eurya,_1970-2007.jpg',
        description: 'this is a bonsai tree it\'s pretty dope',
        price: '40.00',
        stock: '3',
        category: ['tree', 'small']
    })
    return newProduct.save();
}


function seedCategories () {
    var newCategory = new Category({
        name: 'Tree'
    })
    return newCategory.save();
}

//Promise.all to save all the different seeds
connectToDb.then(function () {
        return Product.remove({})
    })
    .then(function () {
        seedCategories();
        return seed();
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
