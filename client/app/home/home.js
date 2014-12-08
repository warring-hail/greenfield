angular.module('pledgr.home', [])

.controller('HomeController', function() {
  $('.uiContainer').addClass('home');
  $('.container-fluid').height('100%');
  $('.uiContainer').width('105%');
});
