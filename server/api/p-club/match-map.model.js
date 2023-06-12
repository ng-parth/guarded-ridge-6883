/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MatchMapSchema = new Schema({
  maleId: String,
  femaleId: String,
  matchOutput: Object,
  matchScore: Number,
  outOf: Number,
  matchedOn: Date,
  matchConfig: Object,
});

module.exports = mongoose.model('MatchMap', MatchMapSchema, 'match_map');
