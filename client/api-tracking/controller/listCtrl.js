/**
 * Created by Parth Mistry on 23-03-2015.
 */
angular.module('bookMarker')
  .controller('apiListCtrl', ['apiService', function(apiService){
    var self = this;

    apiService.get().then(function(data){
      self.apis = data.data;
      console.log('Data is :', self.apis);
    }, function(err) {
      console.log('Error is:', err);
    });
  }]);