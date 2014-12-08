var mongoose = require('mongoose');

// New schema for sms messages sent to users
var SentMessagesSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  choice1: {
    type: String,
    required: true
  },
  choice2: {
    type: String,
    required: true
  },
  choice3: {
    type: String,
    required: true
  },
  messageBody: {
    type: String,
    required: true
  }
});

var SentMessages = mongoose.model('SentMessages', SentMessagesSchema);

var DonationsSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  charity: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
});

var Donations = mongoose.model('Donations', DonationsSchema);

module.exports = {
  SentMessages: SentMessages,
  Donations: Donations
};
