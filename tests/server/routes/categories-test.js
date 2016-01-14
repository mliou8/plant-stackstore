// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Category = mongoose.model('Category');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var request = require('supertest');
var app = require('../../../server/app');


// //Declare a helper function that gets category IDs
// //based on name
// function getCategoryID (name) {
//     Category.findOne({name: name})
//     .then(function(categories) {
//       console.log(categories)
//         return categories._id
//     })
// }

describe('Categories API Routes', function () {

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

		beforeEach('Create a Category', function (done) {
			console.log("Category created")
      Category.create(category, done);
		});


    it('should get all categories', function(done) {
      request(app)
        .get('/api/categories')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.equal(null);
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.equal("TestCategory");
          done();
        });
    });

  });


  describe('Posting', function() {
    it('should create a category', function(done) {
      request(app)
        .post('/api/categories')
        .send({name:'TestCategory'})
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.equal(null);
          expect(res.body.name).to.be.an('string');
          expect(res.body.name).to.equal('TestCategory');
          done();
        });
    });
  });

  describe('Putting', function() {

    var category = {
      name: 'TestCategory'
    };

    beforeEach('Create a Category', function (done) {
      Category.create({
          name: 'TestCategory'
        }
      }).then(function (category) {
          var id = category._id
      })
      , done)

    it('should edit a category', function(done) {
      request(app)
        .get('/api/categories/' + id)
        .end(function(err, res) {
          request(app)
          .put('/api/categories/' + id)
          .send({name:'NewCategory'})
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(err).to.equal(null);
            expect(res.body.name).to.equal('NewCategory');
            done();
        });
        })
    });
  });

//   describe('Deleting', function() {
//     var category = {
//       name: 'TestCategory'
//     };

//     beforeEach('Create a Category', function (done) {
//       Category.create(category, done);
//     });

//     it('should delete a category', function(done) {
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

});