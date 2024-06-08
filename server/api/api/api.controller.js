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

exports.fixDiscrepancy = function(req, res){
  console.log('@fixDiscrepancy');
  // return Api.find({createdTs: '5/30/2024, 12:29:58 PM'}).then(reports => {
  return Api.find({name: 'BUS_STATUS_DISCREPANCY'}).then(reports => {
    const updatePromise = [];
    reports.forEach(r => {
      try {
        const {route, routeResp} = r.apiInfo;
        const keys = Object.keys(routeResp?.stopsEta[route.defaultStopId]);
        const newStopsEta = {};
        newStopsEta[route.defaultStopId] = {};
        let updateReqd = 0;
        for(let key of keys) {
          if (typeof (routeResp?.stopsEta[route.defaultStopId][key]) === typeof '') {
            // console.log('Need processing');
            updateReqd++;
            const busData = JSON.parse(routeResp?.stopsEta[route.defaultStopId][key]);
            busData.dts = moment(busData.tS).format();
            busData.timeDiff = moment(busData.tS).fromNow();
            if (busData.eta > 0) {
              busData.etaMsg = `In ${Math.floor(busData.eta / 60)} mins`;
            }
            newStopsEta[route.defaultStopId][key] = (busData);
          }
        }
        // console.log('updateReqd count : ', updateReqd);
        if (updateReqd > 0) {
          // console.log('Updating Promise ');
          updatePromise.push(Api.updateOne({_id: r._id}, {$set: {'apiInfo.routeResp.stopsEta': newStopsEta}}));
        }

      } catch (e) {
        console.log('Err processing: ', r.createdTs, e)
        // res.send(reports.length);
      }
    })
    console.log('Final Updates: ', updatePromise.length);
    return Promise.all(updatePromise).then(updateResp => {
      res.send({reports: reports.length, updateResp});
    }).catch(updateErr => {
      console.log('Err @updatErr: ', updateErr);
      res.send(reports.length);
    })

  }).catch(err => handleError(res, err))
};

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {action: 'failure', error: err});
}
