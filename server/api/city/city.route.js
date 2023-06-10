/**
 * Created by Parth Mistry on 2023-06-08.
 */
var express = require('express');
var controller = require('./city.controller');

var router = express.Router();

router.get('/', controller.get);

module.exports = router;
