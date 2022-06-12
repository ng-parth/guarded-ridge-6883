/**
 * Created by parth on 30/7/15.
 */
var express = require('express');
var controller = require('./nse-oc.controller');

var router = express.Router();

router.get('/bn', controller.getbn);

module.exports = router;