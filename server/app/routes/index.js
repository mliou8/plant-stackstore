'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/user', require('./user'));
router.use('/review', require('./review'));
router.use('/categories', require('./categories'));
router.use('/orders', require('./orders'));
router.use('/email', require('./email'));
router.use('/promo', require('./promo'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
