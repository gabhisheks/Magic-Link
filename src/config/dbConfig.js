//Bring in the mongoose module
const mongoose = require('mongoose');

// User define module
var config = require('./config');

var dbURI = config.db.url+config.db.name;

// Use native promises
mongoose.Promise = global.Promise;

//console to check what is the dbURI refers to
console.log("Database URL is =>>", dbURI);

//Open the mongoose connection to the database
mongoose.connect(dbURI, {
	'config': {
		'autoIndex': false
	},
	'useMongoClient': true,
});

// Db Connection
var db = mongoose.connection;

db.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});

db.on('error', function(err){
	console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', function(){
	console.log('Mongoose disconnected');
});

process.on('SIGINT', function(){
	db.close(function(){
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

//Exported the database connection to be imported at the server
exports.default = db;
