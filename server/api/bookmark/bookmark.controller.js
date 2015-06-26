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

    //RUN THIS COMMENTED CODE AS SEED ELEMENT FOR NEWLY CLONED PRJ

    //var dummyBms = [{"link":"http://youtube.com","title":"irure","tags":["officia","voluptate","voluptate"],"active":true,"created":"2014-05-05"},{"link":"http://www.example.com","title":"ipsum","tags":["enim","exercitation","mollit","officia"],"active":true,"created":"2014-10-20"},{"link":"http://youtube.com","title":"dolor","tags":["cillum","nisi","proident","eu"],"active":true,"created":"2014-01-27"},{"link":"http://www.example.com","title":"proident","tags":["qui","ullamco","ad"],"active":true,"created":"2015-06-11"},{"link":"http://www.example.com","title":"laboris","tags":["laborum"],"active":true,"created":"2015-06-10"},{"link":"http://youtube.com","title":"enim","tags":["in","quis","commodo"],"active":true,"created":"2015-01-20"},{"link":"http://placehold.it/32x32","title":"in","tags":["dolore","ut"],"active":true,"created":"2014-09-22"},{"link":"http://placehold.it/32x32","title":"eiusmod","tags":["fugiat","deserunt","sit"],"active":true,"created":"2015-01-03"},{"link":"http://www.example.com","title":"elit","tags":["ex","incididunt"],"active":true,"created":"2015-02-14"},{"link":"http://www.example.com","title":"incididunt","tags":["occaecat","excepteur","incididunt","aliquip"],"active":true,"created":"2015-02-08"},{"link":"http://www.example.com","title":"deserunt","tags":["et"],"active":true,"created":"2014-03-24"},{"link":"http://youtube.com","title":"deserunt","tags":["veniam"],"active":true,"created":"2015-05-05"},{"link":"http://youtube.com","title":"duis","tags":["nostrud","tempor"],"active":true,"created":"2015-01-07"},{"link":"http://www.example.com","title":"dolore","tags":["nisi","enim"],"active":true,"created":"2014-11-11"},{"link":"http://youtube.com","title":"non","tags":["aliquip","enim","Lorem"],"active":true,"created":"2014-08-02"},{"link":"http://www.example.com","title":"in","tags":["tempor","officia"],"active":true,"created":"2014-10-28"},{"link":"http://placehold.it/32x32","title":"irure","tags":["aliquip","reprehenderit","commodo","duis"],"active":true,"created":"2015-01-09"},{"link":"http://youtube.com","title":"magna","tags":["officia","ipsum","aute","reprehenderit"],"active":true,"created":"2014-12-29"}];
    ////Source: http://www.json-generator.com/api/json/get/cqDkTWbHYi?indent=0
    //if (bookmarks.length === 0) {
    //  for (var i=0;i<dummyBms.length; i++) {
    //    var bm = dummyBms[i];
    //    bm.createdTs = (new Date(bm.created)).getTime();
    //    delete bm.created;
    //  }
    //  console.log('Array size:', dummyBms.length);
    //  Bookmark.collection.insert(dummyBms, function(err, bms){
    //    if (err) {
    //      handleError(res, err);
    //    }
    //    console.log('Bookmarks: ', bms.length);
    //    res.send(bms)
    //  })
    //}

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