require('dotenv').load();
var AuthCodeModel = require('./authCodeModel');
var SmsModel = require('./smsModel');
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate a random authentication code and save it in the db
var generateCode = function(userPhone) {
  var code = Math.floor(Math.random() * 90000) + 10000;
  var codeModel = new AuthCodeModel.AuthCode({ phone: userPhone, code: code });
  codeModel.save(function(err) {
    if (err) { throw err; }
  });
  return code;
};

module.exports = {
  // Receive the user's choice and process the donation
  // smsReceiver: function(req, res) {
  //     var userChoice = req.body.Body;
  //   },
  // Send an auth code to the user
  sendVerification: function(req, res) {
    var userPhone = req.body.phone;
    var code = generateCode(userPhone);

    client.sendMessage({
      to: '+1' + userPhone,
      from: '+16508259600',
      body: 'Enter ' + code + ' on the signup page to verify your account.'
    }, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({ sent: false });
      } else {
        res.status(204).send({ sent: true });
      }
    });

  },
  // Check to see if the verification code exists in the DB
  verifyCode: function(req, res) {
    var userPhone = req.body.phone;
    var code = req.body.code;
    AuthCodeModel.AuthCode.find({ phone: userPhone, code: code }, function(err, data) {
      if (err) { return console.error(err); }
      if (data.length === 0) {
        res.status(201).send({ found: false });
      } else {
        res.status(201).send({ found: true });
      }
    });
  }
};
