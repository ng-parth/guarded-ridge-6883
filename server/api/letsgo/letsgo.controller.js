var Route = require('./route.model');
var RouteTags = require('./route-tag.model');
var Utils = require('./../../services/utils');
var RouteService = require('./route.service');
var nanoidService = require('nanoid');
const { nanoid } = nanoidService;


exports.getRouteTags = function (req, resp) {
  // console.log('getRouteTags: ');
  RouteTags.find({ status: true }, {id: 1, tagName: 1, _id: 0}).sort({tagName: 1}).then(tags => {
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
  const findQuery = { status: true, ...(req.query || {}) };
  Route.find(findQuery, {apiUrl: 0, _id: 0}).then(function(routes){
    resp.send({ action: 'success', data: routes });
  }).catch(err => handleError(resp, err));
}

exports.getRouteStatus = function (req, resp) {
  console.log('getRouteStatus: ', req.params);
  const { routeId } = req.params;
  Route.findOne({ id: routeId }).then(route => {
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
    delete newRoute.apiUrl;
    delete newRoute._id;
      resp.send({action: 'success', data: newRoute});
  }).catch(err => {
    console.log('Err @postRoute: ', err);
    return handleError(resp, err);
  })
}

exports.putRoute = function (req, resp) {
  var route = req.body;
  // console.log('upsertRoute:');
  Route.updateOne({ id: route.id }, route).then(newRoute => {
    delete newRoute.apiUrl;
    delete newRoute._id;
    resp.send({action: 'success', data: newRoute});
  }).catch(err => {
    console.log('Err @putRoute: ', err);
    return handleError(resp, err);
  })
}

exports.getSearchResults = function (req, resp) {
  // console.log('getSearchResults: ', req.body);
  const {searchText } = req.body;
  // const searchText = '62';
  if (!searchText)  return handleError(resp, 'No search text found!');
  // return resp.send({"action":"success","data":[{"routeId":"WvHcZhLR","routeName":"62","firstStopName":"Pandit Paluskar Chowk","lastStopName":"Vidyavihar Bus Station"},{"routeId":"xJckhxZz","routeName":"62","firstStopName":"Vidyavihar Bus Station","lastStopName":"Pandit Paluskar Chowk"},{"routeId":"XHQJbUcX","routeName":"621","firstStopName":"Malad Station West Or Anand Marg","lastStopName":"Malad Station West Or Anand Marg"},{"routeId":"zxbeTcQx","routeName":"629","firstStopName":"Samata Nagar Bus Station Kandivali East","lastStopName":"Samata Nagar Bus Station Kandivali East"},{"routeId":"utIRzqpf","routeName":"262","firstStopName":"Goregaon Bus Station West","lastStopName":"Goregaon Bus Station West"},{"routeId":"EkEKiDHQ","routeName":"462","firstStopName":"Vaishali Nagar","lastStopName":"Borivali Station East"},{"routeId":"lJySrzEK","routeName":"462","firstStopName":"Borivali Station East","lastStopName":"Vaishali Nagar"},{"routeId":"BnLMqYbw","routeName":"A-624","firstStopName":"Anand Nagar Appapada Malad East","lastStopName":"Malad Station East Or Poddar Park"},{"routeId":"PGmjYNPz","routeName":"A-624","firstStopName":"Malad Station East Or Poddar Park","lastStopName":"Anand Nagar Appapada Malad East"},{"routeId":"ZIATzTIt","routeName":"A-462","firstStopName":"Borivali Station East","lastStopName":"Vaishali Nagar"},{"routeId":"bUrCOzkS","routeName":"A-462","firstStopName":"Vaishali Nagar","lastStopName":"Borivali Station East"},{"routeId":"gkjGcQLp","routeName":"A-626","firstStopName":"Malad Station West Or Anand Marg","lastStopName":"Malad Station West Or Anand Marg"},{"routeId":"SWSEndSa","routeName":"A-629","firstStopName":"Samata Nagar Bus Station Kandivali East","lastStopName":"Samata Nagar Bus Station Kandivali East"},{"routeId":"SOxwSqtl","routeName":"A-621","firstStopName":"Malad Station West Or Anand Marg","lastStopName":"Malad Station West Or Anand Marg"}]});
  RouteService.searchResults(searchText)
      .then(res => {
        // console.log(resp);
        resp.send({action: 'success', data: res});
      }).catch(err => handleError(resp, err));
}

exports.getRouteStopInfo = function (req, resp) {
  const {routeId} = req.body;
  // const routeId = 'xJckhxZz';
  if (!routeId)  return handleError(resp, 'No routeId found!');
  // return resp.send({"action":"success","data":{"routeId":"xJckhxZz","reverseRouteId":"WvHcZhLR","stops":[{"stopId":"pXUnCMuD","stopName":"Vidyavihar Bus Station","shortId":3053},{"stopId":"sNkdYJCV","stopName":"Navsena Gate Or Kirol Village Vidyavihar","shortId":1072},{"stopId":"fJBOMfZR","stopName":"Indira Nagar Or Khalai Village","shortId":854},{"stopId":"WDgWQQIH","stopName":"Vidya Vihar S T Workshop","shortId":383},{"stopId":"eTvtyqfC","stopName":"Navpada","shortId":4808},{"stopId":"EXnIOfXT","stopName":"Mukund Company Or P W D Office","shortId":5116},{"stopId":"onOtQCmu","stopName":"Kamani","shortId":3853},{"stopId":"gtZxlHfS","stopName":"Sheetal Cinema","shortId":436},{"stopId":"YKqIhHti","stopName":"Old Agra Road","shortId":1810},{"stopId":"IXWTzdWQ","stopName":"Kurla Depot","shortId":3029},{"stopId":"ZSihAxId","stopName":"Anjanabai Magar or Freedom Fighter Ramchandra Dhondu Surve Chowk","shortId":4745},{"stopId":"cZBfpwYy","stopName":"B K C Telephone Exchange","shortId":377},{"stopId":"nRSumeol","stopName":"Citi Bank","shortId":4123},{"stopId":"qahxFjoS","stopName":"Diamond Market","shortId":1479},{"stopId":"oDyYBRkB","stopName":"ICICI Bank","shortId":1496},{"stopId":"pSyVDhTZ","stopName":"Bharat Nagar","shortId":3636},{"stopId":"xxMykHfz","stopName":"Tata Colony","shortId":3628},{"stopId":"ACZGpjjX","stopName":"Income Tax Office","shortId":287},{"stopId":"VQJKIIZr","stopName":"Reserve Bank of India","shortId":4337},{"stopId":"XniMUbde","stopName":"MMRDA Or Family Court","shortId":1701},{"stopId":"Ypiguqnp","stopName":"Kala Nagar","shortId":367},{"stopId":"RsyfAqVf","stopName":"Kala Nagar","shortId":89},{"stopId":"WYJQpcxT","stopName":"Mahim Koliwada","shortId":1265},{"stopId":"NgMhvtTA","stopName":"Mahim","shortId":65},{"stopId":"SpySsUmM","stopName":"Mahim Paradise","shortId":1310},{"stopId":"bdSKfohy","stopName":"Shitaladevi Temple","shortId":4650},{"stopId":"JPQxydkK","stopName":"Citylight Cinema","shortId":2802},{"stopId":"IutxRJSc","stopName":"Ram Ganesh Gadkari Chowk","shortId":1684},{"stopId":"ppkHZsbi","stopName":"Ranade Road","shortId":1943},{"stopId":"ePEzmQFs","stopName":"Prabodhankar Thackeray Chowk","shortId":3347},{"stopId":"owOZjzhr","stopName":"Agar Bazar","shortId":2529},{"stopId":"xlVmzJoS","stopName":"Siddhivinayak Mandir","shortId":3239},{"stopId":"vNKKCWiK","stopName":"Prabhadevi","shortId":4254},{"stopId":"RqHGmJhD","stopName":"Babasaheb Worlikar Chowk","shortId":4061},{"stopId":"EFreqrUq","stopName":"Babasaheb Worlikar Chowk","shortId":598},{"stopId":"ystRuNNK","stopName":"Dr Ravindra Kulkarni Chowk Or Sasmira","shortId":1221},{"stopId":"eFzCNyKn","stopName":"Doordarshan","shortId":1346},{"stopId":"odVCAnOU","stopName":"Poddar Hospital Or Siddharth Nagar","shortId":2967},{"stopId":"DvToQTlw","stopName":"Acharya Atre Chowk","shortId":3393},{"stopId":"kTvMzYSk","stopName":"Jarimari Mata Mandir Or S T Office","shortId":5054},{"stopId":"QFLToCGe","stopName":"Nehru Planetarium","shortId":4921},{"stopId":"tJQfEzLF","stopName":"Nehru Planetarium N S C I","shortId":318},{"stopId":"hUvgZvqu","stopName":"Lala Lajpatrai College","shortId":3404},{"stopId":"OsStYMkb","stopName":"Vatsalabai Desai Chowk","shortId":4282},{"stopId":"QqgeCFav","stopName":"Jaslok Hospital","shortId":405},{"stopId":"eKDwogXn","stopName":"Cumbala Hill Post Office","shortId":4582},{"stopId":"wtIqJAUH","stopName":"Nalanda Or Peddar Road","shortId":3992},{"stopId":"YVgkEuCT","stopName":"Babulnath Junction","shortId":288},{"stopId":"ekyfnrsO","stopName":"Babulnath Junction","shortId":5183},{"stopId":"gRJuhBXo","stopName":"Shrimati Motiben Dalvi Hospital","shortId":2634},{"stopId":"sMylvBMP","stopName":"Sukh Sagar","shortId":889},{"stopId":"REWQUmjI","stopName":"Pandit Paluskar Chowk","shortId":2485},{"stopId":"FaGuOHzr","stopName":"Pandit Paluskar Chowk","shortId":627}]}});
  RouteService.routeStopInfo(routeId)
      .then(res => {
        resp.send({action: 'success', data: res});
      }).catch(err => handleError(resp, err));
}

function handleError(res, err) {
  console.log('ERROR IS :',err);
  return res.send(500, {action: 'failure', error: err});
}
