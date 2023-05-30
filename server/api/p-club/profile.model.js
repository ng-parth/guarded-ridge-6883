/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  idText: String, // original string extracted from html
  id: String, // id extracted from actual idText
  name: String,
  surname: String,
  age: String,
  height: String,
  weight: String,
  qualification: String,
  occupation: String,
  native: String,
  father: String,
  fatherOccupation: String,
  mother: String,
  motherOccupation: String,
  brothers: String,
  sisters: String,
  familyIncome: String,
  personalIncome: String,
  birthDate: String,
  birthTime: String,
  birthPlace: String,
  specs: String,
  mangalShani: String,
  aboutMe: String,
  imageUrl: String, // imagekit url
  originalImageUrl: String, // Original image url extracted from html
  address: String,
  contactNo: String,
  email: String,
  gender: String,
  //connectionStatus: 'SHORTLISTED', 'REQUESTED', 'ACCEPTED', 'REJECTED', 'TALKS_IN_PROGRESS', 'NO_MATCH_DECLINE'
  connectionStatus: {type: String, default: 'SHORTLISTED', required: true},
  status: {type: Boolean, default: true, required: true},
});

module.exports = mongoose.model('Profile', ProfileSchema);
