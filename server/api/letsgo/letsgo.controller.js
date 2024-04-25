var Route = require('./route.model');
var RouteTags = require('./route-tag.model');
var Utils = require('./../../services/utils');
var RouteService = require('./route.service');
var nanoidService = require('nanoid');
const { nanoid } = nanoidService;


exports.getRouteTags = function (req, resp) {
  // console.log('getRouteTags: ');
  RouteTags.find({ status: true }, {id: 1, tagName: 1}).then(tags => {
    // if (!tags.length) {
    //   const rTags = ['Century => RGGC', 'Century => Kalanagar', "Century => Bharatnagar", "Century => WeW", "WeW => Kalanagar", "WeW => Century", "Kalanagar => Century"].map(t => new RouteTags({ id: nanoid(5), tagName: t}));
    //   RouteTags.insertMany(rTags).then(function(result) {
    //     resp.send({ action: 'success', data: result });
    //   }).catch(err => handleError(resp, err));
    // } else
    resp.send({ action: 'success', data: tags });
  }).catch(err => handleError(resp, err));
}

exports.postRouteTag = function (req, resp) {
  const {tagName} = req.body;
  if (!tagName) return resp.send(400, {action: 'failure', error: 'Missing tag name'});
  const newRouteTag = new RouteTags({id: nanoid(5), tagName})
  RouteTags.create(newRouteTag)
      .then(routeTag => resp.send({action: 'success', data: newRouteTag}))
      .catch(err => handleError(resp, err));
}

exports.getRoutes = function (req, resp) {
  // console.log('getRoutes: ', req.params);
  const findQuery = { status: true, ...(req.params || {}) };
  Route.find(findQuery, {apiUrl: 0}).then(function(routes){
    resp.send({ action: 'success', data: routes });
  }).catch(err => handleError(resp, err));
}

exports.getRouteStatus = function (req, resp) {
  console.log('getRouteStatus: ', req.params);
  const { routeId } = req.params;
  Route.findOne({ _id: routeId }).then(route => {
    RouteService.getRouteStatus(route)
        .then(routeStatus => resp.send({ action: 'success', data: routeStatus }))
        .catch(e => handleError(resp, e));
  }).catch(err => handleError(resp, err));
}

exports.postRoute = function (req, resp) {
  var route = req.body;
  // console.log('upsertRoute:');
  route.id = nanoid(5);
  Route.create(route).then(newRoute => {
      resp.send({action: 'success', data: newRoute});
  }).catch(err => {
    console.log('Err @postRoute: ', err);
    return handleError(resp, err);
  })
}

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {action: 'failure', error: err});
}
