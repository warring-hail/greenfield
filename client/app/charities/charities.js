angular.module('pledgr.charities', [])

.controller('CharitiesController', function($scope, $stateParams) {
  $scope.charities = [$stateParams.c1, $stateParams.c2, $stateParams.c3];
});
