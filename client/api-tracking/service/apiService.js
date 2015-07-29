/**
 * Created by Parth Mistry on 24-03-2015.
 */
angular.module('bookMarker')
.service('apiService',['$http',function($http){
    this.get = function(){
      return $http.get('/api/api/getApis');
    };
  }]);