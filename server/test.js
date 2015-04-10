/**
 * Created by Parth Mistry on 26-03-2015.
 */
var express = require('express');
var app = express();
var fs = require('fs');
app.use(express.static('../'));

app.get('api/bookmark', function (req, res) {
  console.log('Req recieved.');
  var bookmarks = fs.readFileSync('bookmarks.json', 'utf-8');
  res.send(JSON.parse(bookmarks));
});

app.get('api/bookmark/:id', function(req, res){
  console.log('Request recieved with id: ', req.params.id);
  var bookmarks =  JSON.parse(fs.readFileSync('bookmarks.json', 'utf-8'));
  var bookmark = _.where(bookmarks, {id: req.params.id});
  if (bookmark) {
    res.send(bookmark);
  } else {
    res.send({});
  }
});

var server = app.listen(3000, function () {
  console.log('App listening at http://localhost:%s', server.address().port);
});