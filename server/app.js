/**
 * Created by Parth Mistry on 30-03-2015.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const _ = require('lodash');
const cookieParser = require('cookie-parser');

var allowCrossDomain = function(req, res, next) {
    console.log('reqUrl: ', req.url);
    const origin = req.header('origin');
    if (req.url === '/' || req.url === '/p-club/profiles' || req.url === '/favicon.ico' || _.isUndefined(origin)) {
        console.log('Calling next: ');
        next();
    } else {
        console.log('origin', origin);
        if ( origin && (origin.indexOf('localhost') > -1
            || origin.indexOf('ng-parth.xyz') > -1
            || origin.indexOf('panchalclub') > -1
            || origin.indexOf('pclub') > -1
            || origin.indexOf('vercel.app') > -1
            || origin.indexOf('chrome-extension') > -1
            || origin.indexOf('ng-parth') > -1
            || origin.indexOf('heroku') > -1
            || origin.indexOf('hb-demo') > -1
            || origin.indexOf('hb') > -1
            || origin.indexOf('github') > -1)) {
                console.log('setting headers: ');
                res.header('Access-Control-Allow-Credentials', true); // TODO: Check if this is required for prod
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        } else {
            res.sendStatus(401);
        }
    }
};
app.use(allowCrossDomain);
app.use(express.static(__dirname + '/../'));
app.use(require('body-parser').json());
app.use(cookieParser());
require('./api')(app);
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/meanDemo-dev';
const fallbackUrl = 'mongodb://Admin:Admin@cluster0-shard-00-00-44dl6.mongodb.net:27017,cluster0-shard-00-01-44dl6.mongodb.net:27017,cluster0-shard-00-02-44dl6.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var port = process.env.PORT || 8085;

mongoose.connect(mongoUrl).catch(err => {
    console.log('Err connecting mongoose: Connecting to fallback.', /*err && err.message || */ '');
    mongoose.connect(fallbackUrl);
});

var server = app.listen(port , function () {
  console.log('App listening at http://localhost:%s', server.address().port);
});

module.exports = app;
