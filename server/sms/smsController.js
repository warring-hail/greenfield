require('dotenv').load();
var AuthCodeModel = require('./authCodeModel');
var SmsModel = require('./smsModel');
var UserModel = require('../users/userModel');
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
  smsReceiver: function(req, res) {
    if (req.method === 'POST') {
      // Store the user's choice from the POST request sent by Twilio
      var userChoice = req.body.Body;
      console.log('text body: ', userChoice);
      // Query the user choices collection with the phone number that sent the response
      SmsModel.UserCurrentChoices.find({phone: req.body.From}, function(err, data) {
        if (err) {return console.error(err);}
        // If the returned object has a property for what the user returned
        if (data[userChoice]) {
          var chosenCharity = data[userChoice];
          // Query the User collection to find out how much they want to donate
          UserModel.find({phone: data.phone}, function(err, data) {
            // Create a new donation in the donations collection
            var donation = new SmsModel.Donations({phone: data.phone, charity: chosenCharity, amount: data.weekly});
            // Save the donation to the collection
            donation.save(function(err) {
              if (err) { throw err; }
            });
            res.status(201).send();
          });
        } else {
          res.status(500).send({});
        }
      });
    }
  },
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
