var smsController = require('./smsController');

module.exports = function(app) {
  app.post('/send', smsController.sendVerification);
  app.post('/verify', smsController.verifyCode);
  app.post('/incoming', smsController.smsReceiver);
};
