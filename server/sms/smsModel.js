var mongoose = require('mongoose');

// New schema for sms messages sent to users
var SentMessagesSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  1: {
    type: String,
    required: true
  },
  2: {
    type: String,
    required: true
  },
  3: {
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
