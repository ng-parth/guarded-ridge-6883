/**
 * Created by Parth Mistry on 30-03-2015.
 */
var fs = require('fs');
var _ = require('lodash');
var Bookmark = require('./bookmark.model');

exports.get = function (req, res) {
  Bookmark.find({active: true},function(err, bookmarks) {
    if (err) {
      handleError(res, err);
    }
    res.send(bookmarks.length > 0 ? bookmarks : []);
  });
};

exports.add = function(req, res){
  var bookmark = req.body;
  Bookmark.create(bookmark, function(err, bookmark){
    if (err) {
      handleError(res, err);
    }
    res.send(true);
  })
};

exports.getById = function(req, res){
  var filter = req.params;
  Bookmark.findById(filter.id, function(err, bookmark){
    if (err) {
      handleError(res, err);
    }
    res.send(bookmark);
  })

};

exports.put = function(req, res){
  var filter = req.params;
  delete req.body._id;
  Bookmark.findOneAndUpdate({_id: filter.id}, req.body, function(err, bookmark){
    if (err) {
      handleError(res, err);
    }
    res.send(true);
  })
};

exports.delete = function(req, res){
  var filter = req.params;
  Bookmark.findOneAndUpdate({_id: filter.id}, {$set: {active: false}}, function(err, bookmark){
    if (err) {
      handleError(res, err);
    }
    res.send(true);
  })
};


function handleError(res, err) {
  console.log('ERROR IS :',err);
  res.send(400, {error: err});
};