angular.module('pledgr', [
  'pledgr.index',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('index', {
      url: '/',
      templateUrl: 'app/index/index.html',
      controller: 'IndexController'
    // })
    // .state('signin', {
    //   url: '/signin',
    //   templateUrl: 'app/auth/signin.html',
    //   controller: 'AuthController'
    // })
    // .state('signup', {
    //   url: '/signup',
    //   templateUrl: 'app/auth/signup.html',
    //   controller: 'AuthController'
    // })
    // .state('charities', {
    //   url: '/charities',
    //   templateUrl: 'app/charities/charities.html',
    //   controller: 'CharitiesController'
    });

    // $httpProvider.interceptors.push('AttachTokens');
});
