/**
 * Created by parth on 30/7/15.
 */
var express = require('express');
var controller = require('./api.controller');

var router = express.Router();

router.get('/trackApi', controller.trackApi);
router.get('/getApis', controller.getApis);

module.exports = router;