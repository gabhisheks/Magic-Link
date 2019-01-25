const mongoose = require('mongoose');

exports.addUser = (data) => {
  let {
    name,
    email,
    address
  } = data;
  return mongoose.model('user').findOneAndUpdate({
    'name': name
  }, {
    '$set': {
      name,
      email,
      address
    }
  }, {
    'upsert': true,
    'new': true,
  }).exec();
};

exports.allUser = () => {
  return mongoose.model('user').find({}).exec();
};

exports.userByName = (name) => {
  return mongoose.model('user').find({
    'name': name
  }).exec();
};

exports.userById = (id) => {
  return mongoose.model('user').find({
    '_id': id
  }).exec();
};