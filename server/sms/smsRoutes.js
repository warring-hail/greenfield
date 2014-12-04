var smsController = require('./smsController.js');

module.exports = function (app) {
  app.post('/send', smsController.sendVerification);
  app.post('/verify', smsController.verifyCode);
};
