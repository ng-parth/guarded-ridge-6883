/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RouteSchema = new Schema({
  id: String,
  busNo: String,
  routeName: String, //src => destination
  stopName: String,
  apiUrl: String,
  webUrl: String,
  defaultStopId: String,
  isPublic: {type: Boolean, default: true, required: true},
  tags: [String],
  status: {type: Boolean, default: true, required: true},
});

module.exports = mongoose.model('Route', RouteSchema);
