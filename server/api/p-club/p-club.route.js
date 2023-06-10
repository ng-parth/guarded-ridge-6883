
var express = require('express');
var controller = require('./p-club.controller');

var router = express.Router();

router.get('/profiles', controller.getPaginatedProfiles);
router.get('/profile/:_id', controller.getProfileDetails);
router.post('/profile', controller.upsertProfile);
router.delete('/profile/:_id', controller.deleteProfile);
router.put('/softDelete/:_id', controller.hideProfile);
router.put('/connectionStatus', controller.updateProfileStatus);
router.put('/profileId', controller.updateProfileId);
router.put('/sync-match/:profileId', controller.syncMatches);
router.get('/get-matches/:profileId', controller.getMatchDetails);

module.exports = router;
