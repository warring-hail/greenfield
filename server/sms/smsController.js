require('dotenv').load();
var AuthCodeModel = require('./authCodeModel');
var SmsModel = require('./sentMessagesModel');
var UserModel = require('../users/userModel');
var CharityModel = require('../charities/charityModel');

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

var weekNumber = function(date) {
  var dayOne = new Date(date.getFullYear(),0,1);
  return Math.ceil(((date - dayOne) / 86400000) / 7);
};

module.exports = {
  // Receive the user's choice and process the donation
  smsReceiver: function(req, res) {
    if (req.method === 'POST') {
      // Store the user's choice from the POST request sent by Twilio
      var userChoice = 'choice' + req.body.Body;
      var userPhone = req.body.From.slice(2);
      // Query the user choices collection with the phone number that sent the response
      SmsModel.SentMessages.findOne({phone: userPhone}, function(err, data) {
        if (err) {return console.error(err);}
        // If the returned object has a property for what the user returned
        if (data[userChoice]) {
          var chosenCharityId = data[userChoice];
          // Query the User collection to find out how much they want to donate
          UserModel.findOne({phone: data.phone}, function(err, data) {
            // Find the current date
            var today = new Date();
            // Set the donation to the amount of the yearly pledge divided by the number of weeks remaining in the year
            var donationAmount = Math.round((data.pledge / (53 - weekNumber(today)))*100) / 100;
            // Create a new donation in the donations collection
            var donation = new SmsModel.Donations({
              phone: data.phone,
              charity: chosenCharityId,
              amount: donationAmount
            });
            // Save the donation to the collection
            donation.save(function(err) {
              if (err) { throw err; }
              else {
                chosenCharityId = parseInt(chosenCharityId);
                CharityModel.findOne({orgid: chosenCharityId}, function(err, data) {
                  client.sendMessage({
                    to: '+1' + userPhone,
                    from: '+16508259600',
                    body: 'Thank you for your donation of $' + donationAmount + ' to ' + data.name + '.'
                  }, function(err) {
                    if (err) {
                      console.log(err);
                    }
                  });
                });
              }
            });
            res.status(204).send();
          });
        } else {
          res.status(500).send();
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
