var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
var _ = require('underscore');
var SentMessage = require('./sentMessagesModel');
var User = require('../users/userModel');
var Charity = require('../charity/charityModel');

// For each item in the array, save the message to the db
var saveMessage = function(messages, next) {
  next = next || function() {};

  messages.forEach(function(message) {
    var sentMessage = new SentMessage(message);
    sentMessage.save(function(err) {
      if (err) {
        throw err;
      }
      next();
    });
  });
};

// Text users with their message
var sendSms = function(messages, next) {
  next = next || saveMessage;

  messages.forEach(function(message) {
    client.sendMessage(
      {
        to: '+1' + message.phone,
        from: '+16508259600',
        body: message.messageBody
      },
      function(err) {
        if (err) {
          console.log(err);
        } else {
          next(messages);
        }
      }
    );
  });
};

// Generate indices for three random charities
var generateRandomIndices = function(min, max) {
  var randoms = [];
  while (randoms.length < 3) {
    var index = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!_.contains(randoms, index)) {
      randoms.push(index);
    }
  }
  return randoms;
};

// Trim charity name length if it's too long
var shortenString = function(string) {
  if (string.length > 25) {
    string = string.substring(0, string.length);
    string += '...';
  }
  return string;
};

// Prepare a message for each user based on random indicies
var prepareMessageBody = function(users, charities, next) {
  next = next || sendSms;
  var messages = [];

  for (var i = 0; i < users.length; i++) {
    var randomIndices = generateRandomIndices(0, charities.length - 1);
    var messageBody = 'Pledgr - decide who to help this week:\n';
    var choice1 = charities[randomIndices[0]];
    var choice2 = charities[randomIndices[1]];
    var choice3 = charities[randomIndices[2]];
    var link = 'http://pledgr.azurewebsites.net/charities/';
    link += choice1.orgid + '/' + choice2.orgid + '/' + choice3.orgid;

    /*jshint multistr: true */
    messageBody += '1. ' + shortenString(choice1.name.toString()) + '\n';
    messageBody += '2. ' + shortenString(choice2.name.toString()) + '\n';
    messageBody += '3. ' + shortenString(choice3.name.toString()) + '\n';
    messageBody += 'Reply with (1/3) to donate or visit ' + link;

    var messageContent = {
      phone: users[i].phone,
      choice1: choice1.orgid,
      choice2: choice2.orgid,
      choice3: choice3.orgid,
      messageBody: messageBody
    };

    messages.push(messageContent);
    messageBody = '';
  }

  next(messages);
};

// Get all charities from the DB
var getCharities = function(users, next) {
  next = next || prepareMessageBody;

  Charity.find(
    {
      name : {
        $ne : null
      }
    }, function(err, data) {
      if (err) {
        console.log('Error fetching charities');
      } else {
        next(users, data);
      }
    }
  );
};

// Select all users from the DB
var getUsers = function(queryData, next) {
  next = next || getCharities;
  queryData = queryData || {};

  User.find(queryData, function(err, data) {
    if (err) {
      console.log('Error fetching users');
    } else {
      next(data);
    }
  });
};

module.exports = {
  getUsers: getUsers,
  getCharities: getCharities
};
