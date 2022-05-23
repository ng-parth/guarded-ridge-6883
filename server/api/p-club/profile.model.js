/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  id: String,
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
});

module.exports = mongoose.model('Profile', ProfileSchema);
