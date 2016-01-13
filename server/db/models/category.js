var mongoose = require('mongoose');
var random = require('mongoose-random');

var schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

schema.plugin(random, { path: 'r' }); // by default `path` is `random`. It's used internally to store a random value on each doc.

mongoose.model('Category', schema);
module.exports= {'Category': mongoose.model('Category', schema)}