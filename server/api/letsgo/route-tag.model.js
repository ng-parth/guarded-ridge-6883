/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RouteTagSchema = new Schema({
  id: String,
  tagName: String,
  status: {type: Boolean, default: true, required: true},
});

module.exports = mongoose.model('RouteTag', RouteTagSchema);
