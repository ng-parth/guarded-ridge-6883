/**
 * Created by Parth Mistry on 23-03-2015.
 */
angular.module('bookMarker')
  .controller('listCtrl',['bookmarkService', function(bookmarkService){
    var self = this;

    bookmarkService.get().then(function(data){
      self.links = data.data;
      console.log('Data is :', self.links);
    }, function(err){
      console.log('Error is:', err);
    });
    self.deleteBookmark = function(bookmarkId){
      var confirmation = confirm('Do u really want to delete this bookmark?');
      if (confirmation) {
        bookmarkService.remove(bookmarkId);
      }
    }
  }]);