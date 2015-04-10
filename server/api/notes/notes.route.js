/**
 * Created by Parth Mistry on 30-03-2015.
 */
var express = require('express');
var controller = require('./notes.controller.js');

var router = express.Router();

router.get('/', controller.get);

module.exports = router;
