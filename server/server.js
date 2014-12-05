var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connects mongoose to the 'pledgr' database;
//the 'pledgr' db is created automatically at connection

var mongoURI = process.env.MONGO_URI || 'mongodb://localhost/pledgr';

mongoose.connect(mongoURI);

require('./config/middleware')(app, express);

module.exports = app;
