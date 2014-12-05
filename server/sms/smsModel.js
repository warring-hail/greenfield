var mongoose = require('mongoose');

// New schema for sms messages sent to users
var UserCurrentChoicesSchema = new mongoose.Schema({
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

var UserCurrentChoices = mongoose.model('UserCurrentChoices', UserCurrentChoicesSchema);

module.exports = {
  UserCurrentChoices: UserCurrentChoices
}