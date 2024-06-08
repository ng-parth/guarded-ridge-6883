/**
 * Created by parth on 30/7/15.
 */

var Api = require('./api.model');
const moment = require("moment");

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

exports.postError = function(req, res) {
  const errObj = req.body;
  // console.log('errObj', errObj);
  errObj.createdTs = moment().format();
  errObj.apiInfo = JSON.parse(errObj.apiInfo);
  Api.create(errObj).then(errRecord => {
    res.sendStatus(200);
  }).catch(err => handleError(res, err))
}

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {action: 'failure', error: err});
}
