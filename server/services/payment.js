const {Cashfree, CFEnvironment: PGEnv} = require("cashfree-pg");

// import {Cashfree, CFEnvironment as PGEnv} from "cashfree-pg";
// import { Cashfree, CFEnvironment } from "cashfree-pg";
// var envs = require('./../config/env');
// const {CFSession, CFEnvironment} = CfApiContract;
// const {Cashfree, CFEnvironment: PGEnv} = CashfreePg;

// let CFSession, CFEnvironment, Cashfree, PGEnv;

const initializeCF = params => {
  // CFSession = params.CFSession;
  // CFEnvironment = params.CFEnvironment;
  // Cashfree = params.Cashfree;
  // PGEnv = params.PGEnv;
}

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || 'TEST430329ae80e0f32e41a393d78b923034';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || 'TESTaf195616268bd6202eeb3bf8dc458956e7192a85';

const getCashfreeEnv = () => {
  return process.env.NODE_ENV === "production" ? {
    CASHFREE_APP_ID: `${CASHFREE_APP_ID}_PROD`,
    CASHFREE_SECRET_KEY: `${CASHFREE_SECRET_KEY}_PROD`,
    CASHFREE_ENV: PGEnv.PRODUCTION,
  } : {
    CASHFREE_APP_ID,
    CASHFREE_SECRET_KEY,
    CASHFREE_ENV: PGEnv.SANDBOX,
  }
}

const getCashfreeInstance = () => {
  const {CASHFREE_APP_ID, CASHFREE_SECRET_KEY, CASHFREE_ENV} = getCashfreeEnv();
  const cashfree = new Cashfree(CASHFREE_ENV, CASHFREE_APP_ID, CASHFREE_SECRET_KEY);
  return cashfree;
}

const generateCashfreeOrder = async payload => {
  try {
    const {orderId, orderAmount, customer_details} = payload
    const cashfree = getCashfreeInstance();
    // Prepare order payload as per Cashfree docs
    const orderPayload = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details,
    };
    const response = await cashfree.PGCreateOrder(orderPayload);
    console.log('CF Order Created: ', response.data);
    return response.data;
  } catch (err) {
    console.log('Fail to generate CF order: ', err);
    console.error('Error:', err?.response?.data?.message);
    return null
  }
}

const generateCfSession = orderDetails => {
  // try {
  //   const { order_id, payment_session_id } = orderDetails;
  //   const cfEnv = process.env.NODE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;
  //   const session = new CFSession(payment_session_id, order_id, cfEnv);
  //   console.log('CF Session Created: ', session);
  //   return session;
  // } catch (err) {
  //   console.log('Fail to generateCfSession', err);
  //   return null;
  // }
}

const verifyOrder = async (orderId) => {
  const cashfree = getCashfreeInstance();
  return cashfree.PGOrderFetchPayments(orderId).then((response) => {
    console.log('Order fetched successfully:', response.data);
    // Sample Success Response:
    // [
    //   {
    //     "auth_id": null,
    //     "authorization": null,
    //     "bank_reference": "5114918733360",
    //     "cf_payment_id": "5114918733360",
    //     "entity": "payment",
    //     "error_details": null,
    //     "international_payment": {
    //       "international": false
    //     },
    //     "is_captured": true,
    //     "order_amount": 1,
    //     "order_currency": "INR",
    //     "order_id": "devstudio_7342191671756127543",
    //     "payment_amount": 1,
    //     "payment_completion_time": "2025-06-21T19:39:39+05:30",
    //     "payment_currency": "INR",
    //     "payment_gateway_details": {
    //       "gateway_name": "CASHFREE",
    //       "gateway_order_id": "2194232869",
    //       "gateway_payment_id": "5114918733360",
    //       "gateway_order_reference_id": null,
    //       "gateway_status_code": null,
    //       "gateway_settlement": "cashfree",
    //       "gateway_reference_name": null
    //     },
    //     "payment_group": "debit_card",
    //     "payment_message": "Simulated response message",
    //     "payment_method": {
    //       "card": {
    //         "card_bank_name": "KOTAK MAHINDRA BANK",
    //         "card_country": "IN",
    //         "card_network": "visa",
    //         "card_network_reference_id": null,
    //         "card_number": "XXXXXXXXXXXX2123",
    //         "card_sub_type": "R",
    //         "card_type": "debit_card",
    //         "channel": "link",
    //         "instrument_id": "7ba2c601-6f2a-47ee-9a03-a204fab9b551"
    //       }
    //     },
    //     "payment_offers": null,
    //     "payment_status": "SUCCESS",
    //     "payment_surcharge": null,
    //     "payment_time": "2025-06-21T19:39:34+05:30"
    //   },
    //   {
    //     "auth_id": null,
    //     "authorization": null,
    //     "bank_reference": null,
    //     "cf_payment_id": "5114918733359",
    //     "entity": "payment",
    //     "error_details": null,
    //     "international_payment": {
    //       "international": false
    //     },
    //     "is_captured": false,
    //     "order_amount": 1,
    //     "order_currency": "INR",
    //     "order_id": "devstudio_7342191671756127543",
    //     "payment_amount": 1,
    //     "payment_completion_time": null,
    //     "payment_currency": "INR",
    //     "payment_gateway_details": {
    //       "gateway_name": "CASHFREE",
    //       "gateway_order_id": "2194232869",
    //       "gateway_payment_id": "5114918733359",
    //       "gateway_order_reference_id": null,
    //       "gateway_status_code": null,
    //       "gateway_settlement": "cashfree",
    //       "gateway_reference_name": null
    //     },
    //     "payment_group": "upi",
    //     "payment_message": null,
    //     "payment_method": {
    //       "upi": {
    //         "channel": "collect",
    //         "upi_id": "testsuccess@gocash",
    //         "upi_instrument": "UPI",
    //         "upi_instrument_number": "",
    //         "upi_payer_account_number": "",
    //         "upi_payer_ifsc": ""
    //       }
    //     },
    //     "payment_offers": null,
    //     "payment_status": "NOT_ATTEMPTED",
    //     "payment_surcharge": null,
    //     "payment_time": "2025-06-21T19:39:18+05:30"
    //   }
    // ]
    const orderResponse = response.data;
    const successResp = orderResponse.filter(transaction => transaction.payment_status === "SUCCESS");
    const pendingResp = orderResponse.filter(transaction => transaction.payment_status === "PENDING");
    let orderStatus;
    if(successResp.length > 0) {
      orderStatus = "SUCCESS"
      // Params used on frontend
      // data["orderId"] = response.orderId
      // data["paymentCurrency"] = 'INR'
      // data["paymentMode"] = response.paymentMode
      // data["referenceId"] = response.referenceId
      // data["paymentAmount"] = response.orderAmount
      // data["CheckSumHash"] = response.signature
      const orderResponse = {
        txStatus: orderStatus,
        orderId,
        paymentMode: JSON.stringify(successResp[0]?.payment_method || {}),
        referenceId: successResp[0]?.bank_reference || '',
        orderAmount: successResp[0]?.order_amount || '',
        signature: successResp[0]?.payment_completion_time || '',
      };
      return { orderResponse, orderStatus };
    } else if(pendingResp.length > 0) {
      orderStatus = "Pending"
    } else {
      orderStatus = "Failure"
    }
    return {orderResponse, orderStatus};
  }).catch((error) => {
    console.error('Error:', error?.response?.data?.message || error);
    return null;
  });
}

const PaymentService = {
  getCashfreeEnv,
  generateCashfreeOrder,
  generateCfSession,
  verifyOrder,
  initializeCF,
}

module.exports = PaymentService

