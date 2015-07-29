/**
 * Created by parth on 29/7/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApiSchema = new Schema({
  createdTs: Number,
  name: String,
  api: String,
  src: String,
  apiInfo: {},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Api', ApiSchema);
