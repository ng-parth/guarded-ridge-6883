const moment = require('moment');

const getFileNameFromUrl = url => {
  const locationArray = url.split('/');
  const fileName = locationArray[locationArray.length - 1];
  return fileName;
}

const createOrder = () => {
  // Function to create an order
  // Implementation will depend on the payment gateway being used
  // This is a placeholder for the actual implementation
  const dateStr = moment().format('YYYYMMDD');
  const randomAlphabets = Array.from({ length: 4 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('');
  return `${dateStr}${randomAlphabets}`;
}
const utils = {
  getFileNameFromUrl,
  createOrder,
}

module.exports = utils;
