var smsController = require('./smsController.js');

module.exports = function (app) {
  app.post('/verify/send', smsController.sendVerification);
  app.post('/verify/check', smsController.verifyCode);
};
