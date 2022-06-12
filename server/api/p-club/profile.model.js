/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  id: String,
  idText: String,
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
  imageUrl: String,
  address: String,
  contactNo: String,
  email: String,
  //connectionStatus: 'SHORTLISTED', 'REQUESTED', 'ACCEPTED', 'REJECTED', 'TALKS_IN_PROGRESS', 'NO_MATCH_DECLINE'
  connectionStatus: {type: String, default: 'SHORTLISTED'},
  status: {type: Boolean, default: true},
});

module.exports = mongoose.model('Profile', ProfileSchema);
