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

module.exports = mongoose.model('SentMessages', SentMessagesSchema);
