/**
 * Created by parth on 30/7/15.
 */

var axios = require('axios');
var http = require('http');

exports.getbn = function(req, res) {
  // axios.get(
  //   'https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY',
  //   { headers: JSON.parse({"content-type":"application/json; charset=UTF-8","x-dns-prefetch-control":"off","x-frame-options":"SAMEORIGIN","strict-transport-security":"max-age=15552000; includeSubDomains","x-download-options":"noopen","x-content-type-options":"nosniff","x-xss-protection":"1; mode=block","last-modified":"Thu, 08 Apr 2021 13:32:36 GMT","etag":"W/\"1876-178b1af4120\"","cache-control":"public, max-age=0","date":"Sun, 25 Apr 2021 20:17:30 GMT","content-length":"6262","connection":"close","set-cookie":["ak_bmsc=F3DA044B60F2AB3717E5FA356FDB00AC312C8CAE024400005ACE856032A93103~pl459qWJ7j3XyvY932ewqAZQhbXVNz75PSs5vyxfg8B29oC3Jbp6xG9P/ckaSwVAeNmIhFBENz4rwGCAm094zP8W3iBzRbA2dnjC/XaWZ7j2D7anRlh7gIHvj7U8FFeMSvF7seghgxpDf3o4lrGwA58XFUBNWEDY+Tn2zN/L0dRo6qgU1ooumALliFzOLQcx0nJ7gMK7sKr06Gg7tzfhLbJzuQb4n9nuy7oignqPBVoJE=; expires=Sun, 25 Apr 2021 22:17:30 GMT; max-age=7200; path=/; domain=.nseindia.com; HttpOnly"],"server-timing":"cdn-cache; desc=HIT, edge; dur=1"}) }
  //   ).then(function(bnResp) {
  //     console.log('BnResp: ', bnResp);
  //     res.send(bnResp.data);
  //   }).catch(function(bnErr){
  //     console.log('BnErr: ', bnErr);
  //     handleError(res, bnErr);
  //   })


  axios.get(
    'https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY',
    // 'https://www.nseindia.com/json/option-chain/option-chain.json',
    { headers: JSON.parse('{"content-type":"application/json; charset=UTF-8","x-dns-prefetch-control":"off","x-frame-options":"SAMEORIGIN","strict-transport-security":"max-age=15552000; includeSubDomains","x-download-options":"noopen","x-content-type-options":"nosniff","x-xss-protection":"1; mode=block","last-modified":"Thu, 08 Apr 2021 13:32:36 GMT","etag":"W/\"1876-178b1af4120\"","cache-control":"public, max-age=0","date":"Sun, 25 Apr 2021 20:17:30 GMT","content-length":"6262","connection":"close","set-cookie":["ak_bmsc=F3DA044B60F2AB3717E5FA356FDB00AC312C8CAE024400005ACE856032A93103~pl459qWJ7j3XyvY932ewqAZQhbXVNz75PSs5vyxfg8B29oC3Jbp6xG9P/ckaSwVAeNmIhFBENz4rwGCAm094zP8W3iBzRbA2dnjC/XaWZ7j2D7anRlh7gIHvj7U8FFeMSvF7seghgxpDf3o4lrGwA58XFUBNWEDY+Tn2zN/L0dRo6qgU1ooumALliFzOLQcx0nJ7gMK7sKr06Gg7tzfhLbJzuQb4n9nuy7oignqPBVoJE=; expires=Sun, 25 Apr 2021 22:17:30 GMT; max-age=7200; path=/; domain=.nseindia.com; HttpOnly"],"server-timing":"cdn-cache; desc=HIT, edge; dur=1"}') }
    // {
    //   headers: {
    //     cookie: "_ga=GA1.2.60184593.1616061161; _gid=GA1.2.519349794.1619372953; RT=\"z=1&dm=nseindia.com&si=ef3bd069-ac50-4c32-9760-b22155752065&ss=knxguesj&sl=0&tt=0&bcn=//684fc53b.akstat.io/",
    //     Cookie: "_ga=GA1.2.60184593.1616061161; _gid=GA1.2.519349794.1619372953; RT=\"z=1&dm=nseindia.com&si=ef3bd069-ac50-4c32-9760-b22155752065&ss=knxguesj&sl=0&tt=0&bcn=//684fc53b.akstat.io/"
    //   }
    // }
  ).then(function(resp) {
    console.log('ocJsonHeader: ', JSON.stringify(resp.headers));
    // axios.get(
    //   'https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY',
    //   { headers: JSON.parse({"content-type":"application/json; charset=UTF-8","x-dns-prefetch-control":"off","x-frame-options":"SAMEORIGIN","strict-transport-security":"max-age=15552000; includeSubDomains","x-download-options":"noopen","x-content-type-options":"nosniff","x-xss-protection":"1; mode=block","last-modified":"Thu, 08 Apr 2021 13:32:36 GMT","etag":"W/\"1876-178b1af4120\"","cache-control":"public, max-age=0","date":"Sun, 25 Apr 2021 20:17:30 GMT","content-length":"6262","connection":"close","set-cookie":["ak_bmsc=F3DA044B60F2AB3717E5FA356FDB00AC312C8CAE024400005ACE856032A93103~pl459qWJ7j3XyvY932ewqAZQhbXVNz75PSs5vyxfg8B29oC3Jbp6xG9P/ckaSwVAeNmIhFBENz4rwGCAm094zP8W3iBzRbA2dnjC/XaWZ7j2D7anRlh7gIHvj7U8FFeMSvF7seghgxpDf3o4lrGwA58XFUBNWEDY+Tn2zN/L0dRo6qgU1ooumALliFzOLQcx0nJ7gMK7sKr06Gg7tzfhLbJzuQb4n9nuy7oignqPBVoJE=; expires=Sun, 25 Apr 2021 22:17:30 GMT; max-age=7200; path=/; domain=.nseindia.com; HttpOnly"],"server-timing":"cdn-cache; desc=HIT, edge; dur=1"}) }
    //   ).then(function(bnResp) {
    //     console.log('BnResp: ', bnResp);
    //     res.send(bnResp.data);
    //   }).catch(function(bnErr){
    //     console.log('BnErr: ', bnErr);
    //     handleError(res, bnErr);
    //   })
    res.send(resp.data);
  }).catch(function(err) {
    handleError(res, err);
  })




//   http.get ({
//     host: '127.0.0.1',
//     port: 8888,
//     path: 'https://www.google.com/accounts/OAuthGetRequestToken'
// }, function (response) {
//     console.log (response);
// });
};

function handleError(res, err) {
  console.log('ERROR IS :',err.message);
  res.send(400, {error: err});
};