var currentPath = __dirname ;
var fs = require('fs');
var apis = fs.readdirSync(currentPath);
var dir = [];
for (var i = 0; i < apis.length; i++) {
  var filePath = currentPath + '/' + apis[i];
  if (fs.statSync(filePath).isDirectory()) {
    dir.push(apis[i]);
  }
}
module.exports = function(app){
  for (var i = 0; i < dir.length; i++) {
    var api = dir[i];
    // console.log('api: ', api);
    if (api === 'hb') {
      app.use('/hb', require('./'+api+'/'+api+'.route'));  
    } else {}
    app.use('/api/'+api,require('./'+api+'/'+api+'.route'));
  }
  
  app.use('/api/',require('./hb/hb.route'));
};