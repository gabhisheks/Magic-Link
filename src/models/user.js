const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  'name': {
    'type': String,
	},
  'email': String,
	'address': {
		'type': String,
	},
}, {
	'timestamps': true
});

exports.default = mongoose.model('user', userSchema);