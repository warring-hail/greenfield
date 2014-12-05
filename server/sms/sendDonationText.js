// Select all the users who are due for a text
  // Select those users for whom today-last message date = the desired duration
// For each user in the list, select the id and a random assortment of organizations blurb field
// For each record returned
  // Prepare the message body
  // Send the text
  // On success of sending the text, save the message to the db
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
var mongoose = require('mongoose');
var SentMessage = require('./sentMessagesModel');
var User = require('../users/userModel');
var Charity = require('../charities/charityModel.js');

var getUsers = function(next) {
  // FOR TESTING ONLY
  // var bob = new User({username: 'bob', phone: 4159330023, password: 123});
  // var tina = new User({username: 'tina', phone: 4159330023, password: 123});
  // tina.save(function(err) { if(err) console.log(err) });

  // Select user phone numbers and save them to an array of arrays
  User.find({},function(err, data) {
    if (err) {
      console.log("Error fetching users");
    } else {
      console.log(data);
      // next(users);
    }
  });
}

var getOrganizations = function(users, next) {
  // Select blurb and id for all orgs in the database and put them in an array
}

var prepareMessageBody = function(users, next) {
  // For each record in the getUsers array
  // Push three random indices of getOrganizations to the user array
  // Generate the message body in the array
}

var sendSms = function(users, next) {
  // For each item in the array, send a message
  client.sendMessage({
      to: '+1' + userPhone,
      from: '+16508259600',
      body: messageBody
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        callback();
    }
    });
}

var saveMessage = function(users, next) {
  // For each item in the array, save the message to the db

}

module.exports = {
  getUsers: getUsers
};
