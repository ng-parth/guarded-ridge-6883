/**
 * Created by Parth Mistry on 23-03-2015.
 */
angular.module('bookMarker')
  .controller('upsertCtrl',['bookmarkService','$stateParams','$state',function(bookmarkService, $stateParams, $state){
    var self = this;
    var bookmarkId = $stateParams.bookMarkId;
    var form = self.upsertForm;
    if (bookmarkId) {
      bookmarkService.getById(bookmarkId).then(function(data){
        console.log('Data', data);
        self.bm = data.data;
      }, function(err){
        console.log('Error: ', err);
      });
    }

    self.saveBookmark = function(){
      var status;
      if ($state.current.name == 'bookmark.edit') {
        status = bookmarkService.update(self.bm);
      } else {
        status = bookmarkService.add(self.bm);
      }
      if (status) {
        $state.go('bookmark.list')
      }

    }
  }]);