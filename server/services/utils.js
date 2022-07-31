const getFileNameFromUrl = url => {
  const locationArray = url.split('/');
  const fileName = locationArray[locationArray.length - 1];
  return fileName;
}

const utils = {
  getFileNameFromUrl,
}

module.exports = utils;
