var Charity = require('./charityModel');
var helpers = require('../config/helpers');

module.exports = {
  fetch: function(req, res) {
    var urlParts = req.url.split('/');
    var orgid = parseInt(urlParts[1], 10);

    Charity.findOne(
      {
        orgid: orgid
      },
      {},
      function(error, entry) {
        if (error) {
          helpers.errorHandler(error, req, res);
        } else {
          res.status(200).send(entry);
        }
      }
    );
  }
};
