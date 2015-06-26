/**
* Created by Parth Mistry on 23-03-2015.
*/
angular.module('bookMarker')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('bookmark', {
        url: '/bookmark',
        abstract: true,
        views: {
          viewMenu: {template: 'Can navigate to <br/> List, Edit'},
          viewBody: {template: '<ui-view></ui-view>'}
        }
      })
      .state('bookmark.list',{
        url: '/list',
        templateUrl: 'client/bookmark/view/list.html',
        controller: 'listCtrl as listCtrl'
      })
      .state('bookmark.add',{
        url: '/add',
        templateUrl: 'client/bookmark/view/add.html',
        controller: 'upsertCtrl as addCtrl'
      })
      .state('bookmark.edit',{
        url: '/edit/:bookMarkId',
        templateUrl: 'client/bookmark/view/edit.html',
        controller: 'upsertCtrl as editCtrl'
      })
  });



//
//
//angular.module('bookmarker')
//  app.factory('bookService', ['$http',function($http){
//    return {
//      getBooks: function() {
//        return $http.get('/books').then(function(data){
//          return data.books;
//        });
//      },
//      getBookById: function(bookId){
//        return $http.get('/book',{id:bookId}).then(function(data){
//          return data.book;
//        });
//      }
//    }
//  }])
//
//
//app.service('bookService', ['$http',function($http){
//    this.getBooks = function() {
//      return $http.get('/books').then(function (data) {
//        return data.books;
//      });
//    };
//    this.getBookById= function(bookId){
//      return $http.get('/book',{id:bookId}).then(function(data){
//        return data.book;
//      });
//    };
//}])
//
//




//app.service('bookService', ['$http', BookServiceFn])
//
//function BookServiceFn($http){
//  this.getBooks = function() {
//    return $http.get('/books').then(function (data) {
//      return data.books;
//    });
//  };
//  this.getBookById= function(bookId){
//    return $http.get('/book',{id:bookId}).then(function(data){
//      return data.book;
//    });
//  };
//}










//app.service('bookService', ['$http',BookService]);
//class BookService {
//  constructor($http) {
//    this.$http = $http;
//  }
//  getBooks() {
//    return $http.get('/books').then(function (data) {
//      return data.books;
//    });
//  }
//  getBookById(bookId) {
//    return $http.get('/book',{id:bookId}).then(function(data){
//      return data.book;
//    });
//  }
//}

//
//
