const axios = require('axios');
const utils = require('../../services/utils');
const { Cashfree, CFEnvironment } =  require('cashfree-pg');
const PaymentService = require("../../services/payment");


// Cashfree Sandbox credentials from documentation
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || 'TEST430329ae80e0f32e41a393d78b923034';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || 'TESTaf195616268bd6202eeb3bf8dc458956e7192a85';
const CASHFREE_BASE_URL = process.env.CASHFREE_BASE_URL || 'https://sandbox.cashfree.com/pg'; // Use production URL in prod

exports.createOrder = async (req, res) => {
  try {
    const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");
    const { orderId = utils.createOrder(), orderAmount, customer_details } = req.body;
    console.log('Creating order', req.body, orderId);

    // var request = {
    //   "order_amount": 1.00,
    //   "order_currency": "INR",
    //   "order_id": "devstudio_7340438180813032487",
    //   "customer_details": {
    //     "customer_id": "devstudio_user",
    //     "customer_phone": "8474090589"
    //   },
    //   "order_meta": {
    //     "return_url": "https://www.cashfree.com/devstudio/preview/pg/mobile/hybrid?order_id={order_id}"
    //   }
    // };
    // Prepare order payload as per Cashfree docs
    const payload = {
      order_id: `devstudio_${orderId}`,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details,
      // order_meta: {
      //   return_url: "https://www.cashfree.com/devstudio/preview/pg/mobile/hybrid?order_id={order_id}"
      // }
    };

    cashfree.PGCreateOrder(payload).then((response) => {
      console.log('Order created successfully:', response.data);
      res.json(response.data);
    }).catch((error) => {
      console.error('Error:', error?.response?.data?.message);
      res.status(500).json({ error: error?.response?.data?.message });
    });

    // const response = await axios.post(
    //   `${CASHFREE_BASE_URL}/orders`,
    //   payload,
    //   {
    //     headers: {
    //       'x-client-id': CASHFREE_APP_ID,
    //       'x-client-secret': CASHFREE_SECRET_KEY,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    // console.log('Got response', response.data);
    // res.json(response.data);
  } catch (err) {
    console.log('Error creating order', err);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    console.log('Verify Payment', req.body, req.params);
    const { orderId } = req.params;

    const response = await axios.get(
      `${CASHFREE_BASE_URL}/orders/${orderId}`,
      {
        headers: {
          'x-client-id': CASHFREE_APP_ID,
          'x-client-secret': CASHFREE_SECRET_KEY,
        },
      }
    );
    console.log('Got response', response.data);
    res.json(response.data);
  } catch (err) {
    console.log('Error verify Payment', err);
    res.status(500).json({ error: err.message });
  }
};

exports.handleWebhook = async (req, res) => {
  // Implement signature verification as per Cashfree docs
  // Update your order/payment status in DB as needed
  console.log('Webhook received:', req.body);
  res.status(200).send('OK');
};

//
// const BACKEND_URL = 'http://localhost:8090/api/rekindle/create-order';
// let response
// try {
//   response = await axios.post(BACKEND_URL, {
//     orderAmount: amount,
//     orderCurrency: 'INR',
//     "customer_details": {
//       "customer_id": "devstudio_user",
//       customer_name: 'Demo User',
//       customer_phone: '9999999999',
//       customer_email: 'demo@rekindle.com',
//     },
//   });
//   console.log('Orde Created: ', response.data);
// } catch (error) {
//   console.log('Error creating order: ', error);
// }
// const { order_id, payment_session_id, env } = response.data;
// const startPayment = async () => {
//   try {
//     const session = new CFSession(payment_session_id, order_id, CFEnvironment.SANDBOX);
//     console.log('session: ', session);
//     CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
//   } catch (e) {
//     console.log('Error in startPayment: ',e);
//   }
// };
// await startPayment();

exports.createCfOrder = async function (req, res) {
  try {
    console.log('Creating order', req.body);
    // const {orderId, orderAmount, customer_details} = req.body;

    // Prepare order payload as per Cashfree docs
    // const payload = {
    //   order_id: orderId,
    //   order_amount: orderAmount,
    //   order_currency: 'INR',
    //   customer_details,
    //   // If webhook available, configure this return url
    //   // order_meta: {
    //   //   return_url: "https://www.cashfree.com/devstudio/preview/pg/mobile/hybrid?order_id={order_id}"
    //   // }
    // };
    // const orderDetails = await PaymentService.generateCashfreeOrder(payload);
    // const cfSession = PaymentService.generateCfSession(orderDetails);
    // res.status(200).json(cfSession)
    const orderDetails = await PaymentService.generateCashfreeOrder(req.body);
    orderDetails.cfEnv = process.env.NODE_ENV === "production" ? 'PROD' : 'TEST';
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Error:', error);
    const errorMsg = error?.message || 'Fail to create payment order.';
    res.status(500).json({ error: errorMsg });
  }
}

exports.verifyCfPayment = async function (req, res) {
  const { orderId } = req.body;
  try {
    const order = await PaymentService.verifyOrder(orderId);
    if (!order || order.orderStatus !== 'SUCCESS') {
      res.status(500).json({ error: 'Payment Failed', order });
    } else res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Payment Failed' });
  }
}
