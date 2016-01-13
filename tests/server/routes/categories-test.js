// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Category = mongoose.model('Category');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var request = require('supertest');
var app = require('../../../server/app');

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
			name: 'Test Category'
		};

		beforeEach('Create a Category', function (done) {
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
          expect(res.body[0].name).to.equal('Test Category');
          done();
        });
    });
  });

  describe('Posting', function() {
    it('should create a category', function(done) {
      request(app)
        .post('/api/categories')
        .send({name: 'Testing Category'})
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.equal(null);
          expect(res.body.name).to.be.an('string');
          expect(res.body.name).to.equal('Testing Category');
          done();
        });
    });
  });

});