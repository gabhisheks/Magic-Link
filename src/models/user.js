const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let userSchema = new Schema({
	'userName': {
		'type': String,
		'trim': true
	},
	'firstName': {
		'type': String,
		'trim': true
	},
	'lastName': {
		'type': String,
		'trim': true
	},
	'userEmailId': {
		'type': String,
		'trim': true
	}}, {
		'timestamps': true
	});

exports.default = mongoose.model('users', userSchema);
