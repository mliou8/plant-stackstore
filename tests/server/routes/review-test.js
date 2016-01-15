// // Instantiate all models
// var mongoose = require('mongoose');
// require('../../../server/db/models');
// var Review = mongoose.model('Review');

// var expect = require('chai').expect;

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var request = require('supertest');
// var app = require('../../../server/app');

// describe('Review API Routes', function () {

//     beforeEach('Establish DB connection', function (done) {
//         if (mongoose.connection.db) return done();
//         mongoose.connect(dbURI, done);
//     });

//     afterEach('Clear test database', function (done) {
//         clearDB(done);
//     });


//   describe('Getting', function() {

//     var Review = {
//             rating: 4,
//             text: "This is pretty good review",
//             product:
//             user:
//         };

//         beforeEach('Create a Review', function (done) {
//             Review.create(Review, done);
//         });


//     it('should get all reviews', function(done) {
//       request(app)
//         .get('/api/reviews')
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(err).to.equal(null);
//           expect(res.body).to.be.an('array');
//           expect(res.body[0].name).to.equal('TestReview');
//           done();
//         });
//     });
//   });

//   describe('Posting', function() {
//     it('should create a Review', function(done) {
//       request(app)
//         .post('/api/reviews')
//         .send({name:'TestReview'})
//         .expect(201)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(err).to.equal(null);
//           expect(res.body.name).to.be.an('string');
//           expect(res.body.name).to.equal('TestReview');
//           done();
//         });
//     });
//   });

//   describe('Putting', function() {

//       var Review = {
//       name: 'TestReview'
//     };

//     beforeEach('Create a Review', function (done) {
//       Review.create(Review, done);
//     });

//     it('should edit a Review', function(done) {
//       request(app)
//         .get('/api/reviews/TestReview')
//         .end(function(err, res) {
//           request(app)
//           .put('/api/reviews/TestReview')
//           .send({name:'NewReview'})
//           .expect(200)
//           .end(function(err, res) {
//             if (err) return done(err);
//             expect(err).to.equal(null);
//             expect(res.body.name).to.equal('NewReview');
//             done();
//         });
//         })
//     });
//   });

//   describe('Deleting', function() {
//     var Review = {
//       name: 'TestReview'
//     };

//     beforeEach('Create a Review', function (done) {
//       Review.create(Review, done);
//     });

//     it('should delete a Review', function(done) {
//       request(app)
//         .delete('/api/reviews/NewReview')
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