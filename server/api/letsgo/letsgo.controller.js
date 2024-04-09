var Route = require('./route.model');
var RouteTags = require('./route-tag.model');
var Utils = require('./../../services/utils');
var RouteService = require('./route.service');
var nanoidService = require('nanoid');
const { nanoid } = nanoidService;


exports.getRouteTags = function (req, resp) {
  // console.log('getRouteTags: ');
  RouteTags.find({ status: true }, function(err, tags){
    if (err) return handleError(resp, err);
    if (!tags.length) {
      const rTags = ['Century => RGGC', 'Century => Kalanagar', "Century => Bharatnagar", "Century => WeW", "WeW => Kalanagar", "WeW => Century", "Kalanagar => Century"].map(t => new RouteTags({ id: nanoid(5), tagName: t}));
      RouteTags.insertMany(rTags, function(e, result) {
        if (err) return handleError(resp, e);
        resp.send({ action: 'success', data: result });
      })
    } else resp.send({ action: 'success', data: tags });
  })
}
exports.getRoutes = function (req, resp) {
  // console.log('getRoutes: ', req.params);
  const findQuery = { status: true, ...(req.params || {}) };
  Route.find(findQuery, {apiUrl: 0}, function(err, routes){
    if (err) return handleError(resp, err);
    if (!routes.length) {
      const RouteSample = new Route({
        busNo: 'C-54',
        routeName: 'WeW => Worli',
        stopName: 'Canara Bank',
        apiUrl: 'https://chalo.com/app/api/vasudha/track/route-live-info/mumbai/RHKEuZAj',
        defaultStopId: 'lrLRBtaE',
      })
      Route.create(RouteSample,function(err, route){
        resp.send({ action: 'success', data: [route] });
      })
    } else resp.send({ action: 'success', data: routes });
  })
}

exports.getRouteStatus = function (req, resp) {
  console.log('getRouteStatus: ', req.params);
  const { routeId } = req.params;
  Route.findOne({ _id: routeId }, function(err, route) {
    if (err) return handleError(resp, err);
    RouteService.getRouteStatus(route)
        .then(routeStatus => resp.send({ action: 'success', data: routeStatus }))
        .catch(e => handleError(resp, e));
  });
}

exports.postRoute = function (req, resp) {
  var route = req.body;
  // console.log('upsertRoute:');
  route.id = nanoid(5);
  Route.create(route).then(newRoute => {
      resp.send({action: 'success', data: newRoute});
  }).catch(err => {
    console.log('Err @postRoute: ', err);
    return handleError(err);
  })
}

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {action: 'failure', error: err});
}
