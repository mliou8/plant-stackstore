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

var categoryData =require('./server/seeds/categories.js')
var productData =require('./server/seeds/products.js')
var userData =require('./server/seeds/users.js')

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
          carts[i] = {userID: myUsers[i]._id.toString(), items: [] };
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

function seedReviews () {
   var promises = []
   var reviewCount = 10;
   console.log("seeding reviews")
    while (reviewCount > 0){
      var rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      var productIndex = Math.floor(Math.random() * myProducts.length) ;
      var userIndex = Math.floor(Math.random() * myUsers.length) ;
      var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis euismod elit non vestibulum. Maecenas porta feugiat dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris sit amet sem id neque varius dapibus. Nunc varius lacinia tellus, a ultricies nibh volutpat a. Vivamus nulla metus, finibus vel fringilla nec, placerat id urna. Aliquam erat volutpat. Nam arcu massa, porta in nisi quis, scelerisque aliquet augue. Duis rutrum finibus elit, quis convallis tortor sagittis id. Praesent vitae luctus sem, volutpat tempus risus. Etiam quis ex metus. Cras id congue turpis. Mauris et massa dapibus, varius urna non, pharetra quam. Praesent tempor dui at ante suscipit tristique a a erat. Aenean ultrices sem eget libero molestie, quis pulvinar arcu pharetra. Nulla placerat ornare turpis eget tincidunt. Quisque imperdiet libero id dictum pretium. Aliquam arcu lectus, mattis quis erat sed, pellentesque ultrices arcu. Nam mauris lectus, molestie et turpis auctor, pellentesque gravida ipsum. Aliquam lobortis in odio in rutrum. Vestibulum justo nunc, molestie sit amet venenatis et, porttitor iaculis urna. Praesent et nunc placerat, tempor nunc in, ornare augue. Sed eget semper est, ut condimentum massa. Aenean a placerat mi. Morbi tellus enim, rutrum elementum neque a, egestas sollicitudin risus. Etiam id nibh vel neque malesuada interdum eget eget magna."
      var reviewData = { rating: rating,
                          text: text,
                          product: myProducts[productIndex]._id.toString(),
                          user:  myUsers[userIndex]._id
                        }
      //console.log("reviewData", reviewData)
      promises.push(Review.create(reviewData))
      reviewCount--
    }
      return Promise.all(promises)

}

//Promise.all to save all the different seeds
connectToDb.then(function () {
        return Promise.all([Category.remove({}),Product.remove({}),User.remove({}),Cart.remove({}),Review.remove({})])
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
