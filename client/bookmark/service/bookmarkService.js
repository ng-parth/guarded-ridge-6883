/**
 * Created by Parth Mistry on 24-03-2015.
 */
angular.module('bookMarker')
.service('bookmarkService',['$http','$q',function($http,$q){
    var bookmarks = [
      {id:'GOOG',title:'Google', link:'http://www.google.com', tags:'Search'},
      {id:'Y',title:'Yahoo', link:'http://www.yahoo.com', tags:'Y!'},
      {id:'GMAIL',title:'Gmail', link:'http://www.gmail.com', tags:'Mail'},
      {id:'YMAIL',title:'Ymail', link:'http://mail.yahoo.com', tags:'Mail'},
      {id:'FUNDO',title:'Befundoo', link:'http://www.befundoo.com', tags:'Blog'},
      {id:'ME',title:'Parth', link:'http://parth.parimal.me', tags:'ME'},
      {id:'UTUBE',title:'Youtube', link:'http://youtube.com', tags:'Video'},
      {id:'AMZ',title:'A-Z', link:'http://www.amazon.in', tags:'Shopping'},
      {id:'FLPK',title:'Flipkart', link:'http://www.flipkart.com', tags:'Shopping'}
    ];
    this.get = function(){
      return $http.get('/api/bookmark');
    };
    this.getById =function(bookmarkId){
      return $http.get('/api/bookmark/'+bookmarkId);
    };
    this.update = function(bookmark){
      return $http.put('/api/bookmark/'+bookmark._id, bookmark);
      return false;
    };
    this.add = function(bookmark) {
      bookmark.createdTs = new Date().getTime();
      console.log('Bookmark = ', bookmark);
      return $http.post('/api/bookmark',bookmark);
    };
    this.remove = function(bookmarkId){
      return $http.delete('/api/bookmark/'+bookmarkId);
    };
  }]);