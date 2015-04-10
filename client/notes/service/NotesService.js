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
      return $http.get('/bookmark/'+bookmarkId);
    };
    this.update = function(bookmark){
      for(var i = 0; i < bookmarks.length; i++) {
        if (bookmark.id === bookmarks[i].id) {
          bookmarks[i] = bookmark;
          return true;
        }
      }
      return false;
    };
    this.add = function(bookmark) {
      bookmark.id = new Date().getTime();
      bookmarks.push(bookmark);
      return true;
    };
    this.remove = function(bookmarkId){
      _.remove(bookmarks,{id: bookmarkId});
    };
  }]);