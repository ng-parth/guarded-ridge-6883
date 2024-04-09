/**
 * Created by parth on 14/7/2023.
 */

const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

router.post('/auth/google', controller.verifyGoogleUser);
router.post('/auth/google/implicit', controller.verifyGoogleUserImplicit);

module.exports = router;
