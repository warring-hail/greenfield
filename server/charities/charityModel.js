var mongoose = require('mongoose');

var CharitySchema = new mongoose.Schema({

  orgid: Number,
  name: String,
  city: String,
  state: String,
  zip: String,
  rating: String,
  metrics: {
    'Program Expenses': String,
    'Administrative Expenses': String,
    'Fundraising Expenses': String,
    'Fundraising Efficiency': String,
    'Primary Revenue Growth': String,
    'Program Expenses Growth': String,
    'Working Capital Ratio': String
  },
  category: String,
  subCategory: String
});

module.exports = mongoose.model('Charity', CharitySchema);
