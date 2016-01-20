var express = require('express');
var router = express.Router();
var app = express();
var controller = require('./controller.js')


router.post('/', controller.send);


module.exports = router;