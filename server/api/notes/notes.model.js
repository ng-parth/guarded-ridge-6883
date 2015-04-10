/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var NotesSchema = new Schema({
  id: String,
  title: String,
  text: String,
  createdTs: Number,
  updatedTs: Number,
  active: Boolean
});

module.exports = mongoose.model('Notes', NotesSchema);
