var charityController = require('./charityController');

module.exports = function(app) {
  app.get('/:orgid', charityController.fetch);
};
