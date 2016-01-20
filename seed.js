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
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Order = Promise.promisifyAll(mongoose.model('Order'));

var categoryData =require('./server/seeds/categories.js')
var productData =require('./server/seeds/products.js')
var userData =require('./server/seeds/users.js')
var seedReviewData =require('./server/seeds/reviews.js')

// Category
// User
// Product (has categories)
// Cart (has users, products)
// Orders (has users, products)
// Review (has users, products)

var myCategories;
var myProducts;
var myUsers;

function seedProduct (productData) {
  console.log("seeding products")
   var promises = []

        productData.forEach(function(product){
            for (i=0 ; i < product.category.length ; i++) {
                 var check = myCategories.filter(function(category){
                                // if (category.name === "flowers"){
                                // console.log("array cat", category.name)
                                // console.log("prod cat", product.category[i])
                                // console.log(category.name ===product.category[i])}
                                return category.name === product.category[i]
                            })[0]._id
                 product.category[i] = check;
            }
               promises.push(Product.create(product))
        })

    return Promise.all(promises)
}


function seedCategories (categoryData) {
  console.log("seeding categories")
   var promises = []
   categoryData.forEach(function(cat){
     promises.push(Category.create(cat))
   })
   return Promise.all(promises)
}

function seedUser (userData) {
  console.log("seeding users")
   var promises = []
   userData.forEach(function(user){
     promises.push(User.create(user))
   })
   return Promise.all(promises)
}

function seedCart () {
  console.log("seeding carts")
   var promises = []
    var carts =[];

        for(i=0; i< myUsers.length ; i++){
          carts[i] = {user: myUsers[i]._id.toString(), items: [] };
        }


       for (i = 0 ; i < carts.length; i++){
           carts[i].items.push({
              product: myProducts[i]._id,
              quantity: Math.floor(Math.random() * (10 - 1 + 1)) + 1
            });

         promises.push(Cart.create(carts[i]))

       }

        return Promise.all(promises)
}

function seedOrders () {
  console.log("seeding orders")
   var promises = []
    var orders =[];
    var statuses = ['pending','completed','delivered','shipped']

        for(i=0; i< myUsers.length ; i++){
          orders[i] = {userID: myUsers[i]._id.toString(),
                      products: [],
                      status: statuses[Math.floor(Math.random() * (3 - 1 + 1)) + 1]
           };
        }


       for (i = 0 ; i < orders.length; i++){
           orders[i].products.push({
              product: myProducts[i]._id,
              quantity: Math.floor(Math.random() * (10 - 1 + 1)) + 1

            });

         console.log("order", orders[i])
         promises.push(Order.create(orders[i]))

       }

        return Promise.all(promises)
}

function seedReviews () {
   var promises = []
   var reviewCount = seedReviewData.length;
   console.log("seeding reviews")
    for (i = 0; i<seedReviewData.length; i++) {

      var rating = seedReviewData[i].rating
      var product = myProducts.filter(function( obj ) {
                 return obj.name == seedReviewData[i].product});
      console.log("product", product)
      var userIndex = Math.floor(Math.random() * myUsers.length)
      var text = seedReviewData[i].text

      var reviewData = { rating: rating,
                          text: text,
                          product: product[0]._id.toString(),
                          user:  myUsers[userIndex]._id
                        }
    //  console.log("reviewData", reviewData)
      promises.push(Review.create(reviewData))
      reviewCount--
    }
      return Promise.all(promises)
}


//Promise.all to save all the different seeds
connectToDb.then(function () {
        return Promise.all([Category.remove({}),Order.remove({}),Product.remove({}),User.remove({}),Cart.remove({}),Review.remove({})])
    })
    .then(function () {
        return seedCategories(categoryData);
    })
    .then(function (categories) {
        myCategories = categories
        return seedUser(userData);
    })
    .then(function(users){
        myUsers = users;
        return seedProduct(productData);
    })
    .then(function(products){
          myProducts = products
        // console.log("products", products)
         return seedCart()
     })
    .then(function(carts){
         return seedReviews()
     })
    .then(function(){
         return seedOrders()
     })
    .then(function(){
         console.log('Seeding successful!!')
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
