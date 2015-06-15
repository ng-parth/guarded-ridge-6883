/**
 * Created by Parth Mistry on 24-03-2015.
 */
angular.module('bookMarker')
.service('bookmarkService',['$http',function($http){
    this.get = function(){
      return $http.get('/api/bookmark');
    };
    this.getById =function(bookmarkId){
      return $http.get('/api/bookmark/'+bookmarkId);
    };
    this.update = function(bookmark){
      return $http.put('/api/bookmark/'+bookmark._id, bookmark);
    };
    this.add = function(bookmark) {
      bookmark.createdTs = new Date().getTime();
      return $http.post('/api/bookmark',bookmark);
    };
    this.remove = function(bookmarkId){
      return $http.delete('/api/bookmark/'+bookmarkId);
    };
  }]);