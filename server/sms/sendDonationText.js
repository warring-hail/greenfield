// Select all the users who are due for a text
  // Select those users for whom today-last message date = the desired duration
// For each user in the list, select the id and a random assortment of organizations blurb field
// For each record returned
  // Prepare the message body
  // Send the text
  // On success of sending the text, save the message to the db
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
Q = require('q');

var identifyUsersToText = function() {

}

var getOrganizations = function() {

}

var prepareMessageBody = function() {

}

var sendSms = function(userPhone, messageBody, callback) {
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

var saveMessage = function() {

}

module.exports = {
  sendDonationText = sendDonationText
}
