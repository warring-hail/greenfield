var mongoose = require('mongoose');

var AuthCodeSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
});

var AuthCode = mongoose.model('AuthCode', AuthCodeSchema);

module.exports = {
  AuthCode: AuthCode
};
