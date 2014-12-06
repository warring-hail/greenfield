angular.module('pledgr.signup', [])

.controller('SignupController', function ($scope, $window, $location) {
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
  	console.log('form submitted');
    alert('form submitted');
  };

  $scope.sendCode = function(){
  	var phone = $scope.user.phone;
  	console.log(phone);
  	//need to refactor for ANGULAR
  	$.ajax({
  	  type: 'POST',
      url: '/api/sms/send',
      data: {phone:phone},
      success: function(data) {
      	if(data.sent === false) {
      	  alert('Error sending message.  Please try again later.');
        }
      }
    });
  };
 
  $scope.verifyCode = function() {
   var phone = $scope.user.phone;
   console.log(phone);
   var code = $scope.user.code;
   console.log(code);
    $.ajax({
      type: 'POST',
      url: '/api/sms/verify',
      data: {phone:phone, code:code},
      success: function(data) {
        if(data.found === true) {
          console.log('Code found');
        } else {
          console.log('Code not found');
        }
      }
    });
  };
});
