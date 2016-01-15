// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var request = require('supertest');
var app = require('../../../server/app');

//Declare a helper function that gets category IDs
//based on name
function getCategoryID (name) {
    Category.findOne({name: name})
    .then(function(categories) {
        return categories._id
    })
}

describe('Products API Routes', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});


  describe('Getting', function() {
  	var category = {
       name: 'TestCategory'
    };

    beforeEach('Create a Product', function (done) {
            Category.create(category)
            .then(function(category) {
              return Product.create({
			        name: 'Bonsai',
			        photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Eurya,_1970-2007.jpg',
			        description: 'this is a bonsai tree it\'s pretty dope',
			        price: '40.00',
			        stock: '3',
			        category: category._id
			       })
            .then(function (product) {
              done();
            })
        })
    })

    it('should get all products', function(done) {
      request(app)
        .get('/api/products/')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.equal(null);
          expect(res.body).to.be.an('array');
          console.log("res.body ", res.body)
          expect(res.body[0].name).to.equal('Bonsai');
          done();
        });
    });
  });

  describe('Posting', function() {
    var categoryID;
    var categoryInfo = {
         name: 'TestCategory'
        };
     beforeEach('Create a Product', function (done) {
        Category.create(categoryInfo)
        .then(function (category) {
          categoryID = category._id
          return Product.create({
          name: 'Bonsai',
          photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Eurya,_1970-2007.jpg',
          description: 'this is a bonsai tree it\'s pretty dope',
          price: '40.00',
          stock: '3',
          category: categoryID
         })
        })
        .then(function(product) {
            done();
      })
  })

    it('should create a product', function(done) {
      request(app)
        .post('/api/products')
        .send(
      {
        name: 'Bomping Pillow',
        photo: 'http://vignette2.wikia.nocookie.net/harrypotter/images/8/8e/Whomping_Willow_PA.jpg/revision/latest?cb=20100617193927',
        description: 'This is a bomping pillow tree. Scary!',
        price: '2000.00',
        stock: '3',
        category: categoryID
      }
        )
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.equal(null);
          expect(res.body.name).to.equal('Bomping Pillow');
          done();
        });
    });
  });

 describe('Putting', function() {

    var categoryID;
    var productID;
    var categoryInfo = {
         name: 'TestCategory'
        };
     beforeEach('Create a Product', function (done) {
        Category.create(categoryInfo)
        .then(function (category) {
          categoryID = category._id
          return Product.create({
          name: 'Bonsai',
          photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Eurya,_1970-2007.jpg',
          description: 'this is a bonsai tree it\'s pretty dope',
          price: '40.00',
          stock: '3',
          category: categoryID
         })
         .then(function (product) {
          productID = product._id
          done();
          })
        })
  })

    it('should edit a product', function(done) {
      request(app)
          .put('/api/product/' + productID)
          .send({name: 'NewProduct', price: '35.00', stock: '5'})
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(err).to.equal(null);
            expect(res.body.name).to.equal('NewProduct');
            done();
        })
    });
  });

  // describe('Deleting', function() {

  //  var product2 = {
  //       _id: "NYRe",
  //       name: 'Whomping Willow',
  //       photo: 'http://vignette2.wikia.nocookie.net/harrypotter/images/8/8e/Whomping_Willow_PA.jpg/revision/latest?cb=20100617193927',
  //       description: 'This is a whomping willow tree. Scary!',
  //       price: '3000.00',
  //       stock: '3',
  //       category: ['mythical', 'dangerous']
  //   }

  //   beforeEach('Create a Product', function (done) {
  //     Product.create(product2, done);
  //   });

  //   it('should delete a Product', function(done) {
  //     request(app)
  //       .delete('/api/product/NYRe')
  //       .expect(404)
  //       .end(function(err, res) {
  //         if (err) return done(err);
  //         expect(err).to.equal(null);
  //         expect(res.body.name).to.equal(undefined);
  //         done();
  //       });
  //   });
  // });


});