const express = require('express');
const controller = require('./rekindle.controller');

const router = express.Router();

// Create order and generate order_token
router.post('/create-order', controller.createOrder);

router.post('/cf-order', controller.createCfOrder);
// Verify payment status
router.post('/verify-cf-payment', controller.verifyCfPayment);
// Verify payment status
// router.get('/verify-payment/:orderId', controller.verifyPayment);

// Cashfree webhook endpoint
router.post('/webhook', controller.handleWebhook);

// Health check route
router.get('/ping', (req, res) => {
  res.send('ping-pong from rekindle server');
});

module.exports = router;
