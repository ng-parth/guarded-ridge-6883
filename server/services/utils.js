const getFileNameFromUrl = url => {
  const locationArray = url.split('/');
  const fileName = locationArray[locationArray.length - 1];
  return fileName;
}

const getGenderKeys = gender => {
  const maleSet = {
    gender: 'Male',
    otherGender: 'Female',
    genderKey: 'maleId',
    otherGenderKey: 'femaleId',
  }
  const femaleSet = {
    gender: 'Female',
    otherGender: 'Male',
    genderKey: 'femaleId',
    otherGenderKey: 'maleId',
  }
  if (['male', 'm'].indexOf(gender.toLowerCase()) > -1) return maleSet;
  if (['female', 'f'].indexOf(gender.toLowerCase()) > -1) return femaleSet;
}

const utils = {
  getFileNameFromUrl,
  getGenderKeys
}

module.exports = utils;
