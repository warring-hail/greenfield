var mongoose = require('mongoose');

var CharitySchema = new mongoose.Schema({
  charity_name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Charity', CharitySchema);
