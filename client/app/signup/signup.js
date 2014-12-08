angular.module('pledgr.signup', [])

.factory('Auth', function ($http){
  var signup = function(data){
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: data
    })
    .then(function (resp) {
        return resp.data;
    });
  };

  return {
    signup: signup
  };
})

.factory('SMS', function ($http){
  var sendCode = function(data){
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/sms/send',
      data: data
    })
    .then(function (resp){
      if (resp.data.sent === false) {
        alert('Error sending message.  Please try again later.');
      };
    });
  };

  var verifyCode = function(data){
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/sms/verify',
      data: data
    })
    .then(function (resp){
      if(resp.data.found === true) {
        console.log('Code found');
      } else {
        console.log('Code not found');
      };
    });
  };

  return {
    sendCode: sendCode,
    verifyCode: verifyCode
  };
})

.controller('SignupController', function ($scope, Auth, SMS){
  $scope.user = {
    first:'First',
    last:'Last',
    username: 'username@example.com',
    pwd: '',
    male: false,
    female: false,
    animals: false,
    ACH: false,
    education: false,
    evironment: false,
    health: false,
    HS: false,
    international: false,
    PB: false,
    religion: false,
    local: false,
    phone: '(111)111-1111',
    code:'test',
    pledge: 100.00
  };

  $scope.signup = function(){
    Auth.signup($scope.user)
  };

  $scope.sendCode = function(){
    var phone = $scope.user.phone.match(/\d/g).join('');
    SMS.sendCode({
      phone: phone
    });
  };

  $scope.verifyCode = function(){
    var phone = $scope.user.phone.match(/\d/g).join('');
    SMS.verifyCode({
      phone: phone,
      code: $scope.user.code
    });
  };
});

