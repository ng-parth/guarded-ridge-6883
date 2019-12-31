var express = require('express');
var controller = require('./hb.controller');
const authController = require('./auth.controller');

var router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.post('/', controller.add);
router.post('/atc', controller.atc);
router.get('/products/:type', controller.getProducts);
router.get('/category-products/:categoryPageName', controller.getCategoryProducts);

// TEST routes for HB-CRM
// They will be called using /crm/****
router.get('/crm/products', controller.get);

router.post('/crm/validate', authController.validate);
router.post('/crm/initial-check', authController.initialCheck);
router.get('/crm/logout', authController.logout);

module.exports = router;
