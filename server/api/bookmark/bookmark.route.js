/**
 * Created by Parth Mistry on 30-03-2015.
 */
var express = require('express');
var controller = require('./bookmark.controller');

var router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.post('/', controller.add);

module.exports = router;
