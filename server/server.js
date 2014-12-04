var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connects mongoose to the 'test' database
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	var userSchema = mongoose.Schema({
		name: String
	})
	var User = mongoose.model('User', userSchema);
	var mike = new User({ name: 'Mike' })
	mike.save(function(err, mike){
		if (err) return console.error(err);
		console.log(mike.name + 'added to db')
	})
});

// require('../config/middleware.js')(app, express);

app.listen(8000);

module.exports = app;
