// // Instantiate all models
// var mongoose = require('mongoose');
// require('../../../server/db/models');
// var Review = mongoose.model('Review');

// var expect = require('chai').expect;

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var request = require('supertest');
// var app = require('../../../server/app');

// describe('User API Routes', function () {

//     beforeEach('Establish DB connection', function (done) {
//         if (mongoose.connection.db) return done();
//         mongoose.connect(dbURI, done);
//     });

//     afterEach('Clear test database', function (done) {
//         clearDB(done);
//     });


//   describe('Getting', function() {

//     var Review = {
//             name: 'TestReview'
//         };

//         beforeEach('Create a Review', function (done) {
//             User.create(User, done);
//         });


//     it('should get all User', function(done) {
//       request(app)
//         .get('/api/User')
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(err).to.equal(null);
//           expect(res.body).to.be.an('array');
//           expect(res.body[0].name).to.equal('TestUser');
//           done();
//         });
//     });
//   });

//   describe('Posting', function() {
//     it('should create a User', function(done) {
//       request(app)
//         .post('/api/User')
//         .send({name:'TestUser'})
//         .expect(201)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(err).to.equal(null);
//           expect(res.body.name).to.be.an('string');
//           expect(res.body.name).to.equal('TestUser');
//           done();
//         });
//     });
//   });

//   describe('Putting', function() {

//       var User = {
//       name: 'TestUser'
//     };

//     beforeEach('Create a User', function (done) {
//       User.create(User, done);
//     });

//     it('should edit a User', function(done) {
//       request(app)
//         .get('/api/User/TestUser')
//         .end(function(err, res) {
//           request(app)
//           .put('/api/User/TestUser')
//           .send({name:'NewUser'})
//           .expect(200)
//           .end(function(err, res) {
//             if (err) return done(err);
//             expect(err).to.equal(null);
//             expect(res.body.name).to.equal('NewUser');
//             done();
//         });
//         })
//     });
//   });

//   describe('Deleting', function() {
//     var User = {
//       name: 'TestUser'
//     };

//     beforeEach('Create a User', function (done) {
//       User.create(User, done);
//     });

//     it('should delete a User', function(done) {
//       request(app)
//         .delete('/api/User/NewUser')
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