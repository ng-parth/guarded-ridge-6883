var express = require('express');
var controller = require('./hb.controller');

var router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.post('/', controller.add);
router.post('/atc', controller.atc);
router.get('/products/:type', controller.getProducts);
router.get('/category-products/:categoryPageName', controller.getCategoryProducts);

module.exports = router;
