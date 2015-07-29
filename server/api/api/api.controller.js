/**
 * Created by parth on 30/7/15.
 */

var Api = require('./api.model');

exports.trackApi = function(req, res) {
  var api = req.query;
  api.apiInfo = JSON.parse(JSON.stringify(api));
  api.createdTs = new Date().getTime();
  Api.create(api,function(err, api){
    if (err) {
      handleError(res, err);
    }
    res.send(true);
  })
};

exports.getApis = function(req, res){
  Api.find({}, null, {sort: {'createdTs': -1}},function(err, apis){
    if (err) {
      handleError(res, err);
    }
    res.send(apis);
  })
};