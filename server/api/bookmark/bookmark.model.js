/**
 * Created by Parth Mistry on 30-03-2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
  createdTs: String,
  title: String,
  link: String,
  tags: String,
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
