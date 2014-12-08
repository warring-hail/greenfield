angular.module('pledgr.factories', [])

.factory('Auth', function($http) {
  var signup = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: data
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  return {
    signup: signup
  };
})

.factory('SMS', function($http) {
  var sendCode = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/sms/send',
      data: data
    })
    .then(function(resp) {
      if (resp.data.sent === false) {
        console.error('Error sending message.  Please try again later.');
      }
    });
  };

  var verifyCode = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/sms/verify',
      data: data
    })
    .then(function(resp) {
      if (resp.data.found === true) {
        console.log('Code found');
      } else {
        console.log('Code not found');
      }
    });
  };

  return {
    sendCode: sendCode,
    verifyCode: verifyCode
  };
});
