var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('Category', schema);
module.exports= {'Category': mongoose.model('Category', schema)}