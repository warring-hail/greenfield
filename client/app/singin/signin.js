angular.module('pledgr.signin', [])

.controller('SignInController', function($scope, $window, Auth) {
  $scope.user = {
    username: 'someone@example.com',
    password: 'Password'
  };

  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('token', token);
        // $location.path('/userhome');
      })
      .catch(function(error) {
        console.error(error);
      });
  };
});
