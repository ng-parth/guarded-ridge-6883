/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MatchMapSchema = new Schema({
  maleId: String,
  femaleId: String,
  match_output: Object,
  match_score: Number,
  out_of: Number,
  matched_on: Date,
  match_config: Object,
});

module.exports = mongoose.model('MatchMap', MatchMapSchema, 'match_map');
