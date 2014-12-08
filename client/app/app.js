angular.module('pledgr', [
  'pledgr.charities',
  'pledgr.index',
  'pledgr.signup',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
//.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'app/index/index.html',
      controller: 'IndexController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    })
    .state('charities', {
       url: '/charities/{c1:[0-9]+}/{c2:[0-9]+}/{c3:[0-9]+}',
       templateUrl: 'app/charities/charities.html',
       controller: 'CharitiesController'
    });

    // $httpProvider.interceptors.push('AttachTokens');
});
