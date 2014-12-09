var request = require('request');
var cheerio = require('cheerio');
var Charity = require('../charity/charityModel');

var scrapeOrgid = function(orgid) {
  var url = 'http://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=' + orgid;
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var json = { orgid: orgid };

      json.name = $('.charityname').html();

      var address = $('.rating p:nth-child(1)').html();
      if (address) {
        address.split('<br>').forEach(function(string) {
          var location = string.split('&#xA0;');
          if (location.length > 1) {
            var city = location[0].trim();
            city = city.substring(0, city.length - 1);
            json.city = city;
            json.state = location[1];
            json.zip = location[2].trim();
          }
        });
      }

      json.rating = $('.rating table table tr:nth-child(2) td:nth-child(2)').html();

      var metrics = {};
      $('.glossary').parent().parent().each(function(index, elem) {
        if (index < 10) {
          var $elem = $(elem);
          var metric = $elem.find('a').text();
          var value = $elem.find('td:nth-child(3)').text().trim();
          if (metric && value) {
            metrics[metric] = value;
          }
        }
      });
      json.metrics = metrics;

      var fullCategory = $('.crumbs').html();
      if (fullCategory) {
        var delimiterIndex = fullCategory.indexOf(':');
        json.category = fullCategory.slice(0, delimiterIndex).trim();
        json.subCategory = fullCategory.slice(delimiterIndex + 1).trim();
      }
      var charity = new Charity(json);
      charity.save(function(error) {
        if (error) {
          console.log(error);
        }
      });
    }
  });
};

module.exports = {
  scrape: function(req, res) {
    var urlParts = req.url.split('/');
    var count = parseInt(urlParts[1], 10) || 100;
    var start = parseInt(urlParts[2], 10) || 3601;
    var end = start + count;

    for (var i = start; i < end; i++) {
      scrapeOrgid(i);
    }

    res.send('scraping away...');
  }
};
