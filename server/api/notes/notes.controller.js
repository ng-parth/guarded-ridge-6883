/**
 * Created by Parth Mistry on 30-03-2015.
 */
var fs = require('fs');
var _ = require('lodash');
var Notes = require('./notes.model.js');

exports.get = function (req, res) {
  console.log('Req recieved.');
  var bookmarks = fs.readFileSync('bookmarks.json', 'utf-8');
  res.send(JSON.parse(bookmarks));
};