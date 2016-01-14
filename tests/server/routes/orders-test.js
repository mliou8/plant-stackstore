// // Instantiate all models
// var mongoose = require('mongoose');
// require('../../../server/db/models');
// var Order = mongoose.model('Order');

// var expect = require('chai').expect;

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var request = require('supertest');
// var app = require('../../../server/app');

// describe('Orders API Routes', function () {

// 	beforeEach('Establish DB connection', function (done) {
// 		if (mongoose.connection.db) return done();
// 		mongoose.connect(dbURI, done);
// 	});

// 	afterEach('Clear test database', function (done) {
// 		clearDB(done);
// 	});


//   describe('Getting', function() {

//     var order = {};

//     beforeEach('Create a Product', function (done) {
//       Product.create(product, done);
//     });

//     it('should get all Orders', function(done) {
//       request(app)
//         .get('/api/orders')
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(err).to.equal(null);
//           expect(res.body).to.be.an('array');
//           console.log("res.body ", res.body)
//           expect(res.body[0].name).to.equal('Bonsai Tree');
//           done();
//         });
//     });
//   });

//   describe('Posting', function() {
//     it('should create a product', function(done) {
//       request(app)
//         .post('/api/Orders')
//         .send(
//       {
//         name: 'Bomping Pillow',
//         photo: 'http://vignette2.wikia.nocookie.net/harrypotter/images/8/8e/Whomping_Willow_PA.jpg/revision/latest?cb=20100617193927',
//         description: 'This is a bomping pillow tree. Scary!',
//         price: '2000.00',
//         stock: '3',
//         category: ['mythical', 'dangerous']
//       }
//         )
//         .expect(201)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(err).to.equal(null);
//           expect(res.body.name).to.equal('Bomping Pillow');
//           done();
//         });
//     });
//   });

//   describe('Putting', function() {

//       var product = {
//         name: 'Bonsai Tree',
//         photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Eurya,_1970-2007.jpg',
//         description: 'this is a bonsai tree it\'s pretty dope',
//         price: '40.00',
//         stock: '3',
//         category: ['tree', 'small']
//     }

//     var product2 = {
//         _id: "NYRe",
//         name: 'Whomping Willow',
//         photo: 'http://vignette2.wikia.nocookie.net/harrypotter/images/8/8e/Whomping_Willow_PA.jpg/revision/latest?cb=20100617193927',
//         description: 'This is a whomping willow tree. Scary!',
//         price: '3000.00',
//         stock: '3',
//         category: ['mythical', 'dangerous']
//     }

//     beforeEach('Create a Product', function (done) {
//       Product.create(product2, done);
//     });


//     it('should edit a product', function(done) {
//       request(app)
//         .get('/api/product/NYRe')
//         .end(function(err, res) {
//           request(app)
//           .put('/api/product/NYRe')
//           .send({name:'NewProduct'})
//           .expect(200)
//           .end(function(err, res) {
//             if (err) return done(err);
//             expect(err).to.equal(null);
//             expect(res.body.name).to.equal('NewProduct');
//             done();
//         });
//         })
//     });
//   });

//   describe('Deleting', function() {

//    var product2 = {
//         _id: "NYRe",
//         name: 'Whomping Willow',
//         photo: 'http://vignette2.wikia.nocookie.net/harrypotter/images/8/8e/Whomping_Willow_PA.jpg/revision/latest?cb=20100617193927',
//         description: 'This is a whomping willow tree. Scary!',
//         price: '3000.00',
//         stock: '3',
//         category: ['mythical', 'dangerous']
//     }

//     beforeEach('Create a Product', function (done) {
//       Product.create(product2, done);
//     });


//     it('should delete a Product', function(done) {
//       request(app)
//         .delete('/api/categories/NewCategory')
//         .expect(204)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(err).to.equal(null);
//           expect(res.body.name).to.equal(undefined);
//           done();
//         });
//     });
//   });
// });