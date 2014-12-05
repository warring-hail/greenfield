var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connects mongoose to the 'pledgr' database;
//the 'pledgr' db is created automatically at connection
mongoose.connect('mongodb://localhost/pledgr');

require('./config/middleware')(app, express);

module.exports = app;
