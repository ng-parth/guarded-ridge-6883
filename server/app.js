/**
 * Created by Parth Mistry on 30-03-2015.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
app.use(express.static(__dirname + '/../'));
app.use(require('body-parser').json());
require('./api')(app);
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/meanDemo-dev';
var port = process.env.PORT || 3000;

mongoose.connect(mongoUrl);

var server = app.listen(port , function () {
  console.log('App listening at http://localhost:%s', server.address().port);
});

module.exports = app;