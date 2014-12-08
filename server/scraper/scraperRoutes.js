var scraperController = require('./scraperController');

module.exports = function(app) {
  app.get('/:count', scraperController.scrape);
};
