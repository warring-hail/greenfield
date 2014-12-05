var mongoose = require('mongoose');

var CharitySchema = new mongoose.Schema({
  charityName: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Charity', CharitySchema);
