
var express = require('express');
var controller = require('./p-club.controller');

var router = express.Router();

router.get('/profiles', controller.getPaginatedProfiles);
router.get('/profile/:id', controller.getProfileDetails);
router.post('/profile', controller.upsertProfile);
// router.delete('/:id', controller.delete);
// router.post('/', controller.add);

module.exports = router;
