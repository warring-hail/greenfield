/*global afterEach, beforeEach, describe, expect, inject, it */

describe('CharitiesController', function() {
  var $scope, $rootScope, createController, $httpBackend, $stateParams;
  var c1 = '1';
  var c2 = '2';
  var c3 = '3';

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('pledgr'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $stateParams = $injector.get('$stateParams');
    $stateParams.c1 = c1;
    $stateParams.c2 = c2;
    $stateParams.c3 = c3;
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('CharitiesController', {
        $scope: $scope
      });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have an orgids property on the $scope', function() {
    createController();
    expect($scope.orgids).to.be.an('object');
  });

  it('should have a makeChart method on the $scope', function() {
    createController();
    expect($scope.makeChart).to.be.a('function');
  });

  it('should call getLinks() when controller is loaded', function() {
    var mockOrgids = [c1, c2, c3];
    $httpBackend.expectGET('/api/charity/' + c1).respond(c1);
    $httpBackend.expectGET('/api/charity/' + c2).respond(c2);
    $httpBackend.expectGET('/api/charity/' + c3).respond(c3);
    createController();
    $httpBackend.flush();
    expect($scope.orgids).to.eql(mockOrgids);
  });
});
