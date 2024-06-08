/**
 * Created by parth on 30/7/15.
 */
var express = require('express');
var controller = require('./api.controller');

var router = express.Router();

router.get('/trackApi', controller.trackApi);
router.get('/getApis', controller.getApis);
router.post('/report-error', controller.postError);
// router.get('/fix-discrepancy', controller.fixDiscrepancy);

module.exports = router;
