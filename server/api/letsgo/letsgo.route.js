
var express = require('express');
var controller = require('./letsgo.controller');

var router = express.Router();

router.get('/route-tags', controller.getRouteTags);
router.post('/route-tag', controller.postRouteTag);
router.get('/routes', controller.getRoutes);
router.get('/status/:routeId', controller.getRouteStatus);
router.post('/route', controller.postRoute);
router.put('/route', controller.putRoute);

module.exports = router;
