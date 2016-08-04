// Load Modules
var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var pug = require('pug');
var cookieparser = require('cookie-parser');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = require('url');

var dbURL = process.env.MONGOLAB_URI || "mongodb://localhost/simple-leaderboards";

var db = mongoose.connect(dbURL, function(err){
	if (err) {
		console.log("Could not connect to database");
		throw err;
	}
});

// Set Variables
var port = process.env.PORT || process.env.NODE_PORT || 3000;
var router = require('./router.js');

// Setup Server
var app = express();

app.use(compression());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.resolve(__dirname + '/../public')));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(favicon(__dirname + '/../public/images/Favicon.png'));

// Setup Routes
router.setupRoutes(app);

// Start Server
var server = app.listen(port, function(err){
	if (err) {
		throw err;
	}
	console.log('Listening on port ' + port);
});