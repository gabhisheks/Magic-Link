const dependencies = require('../../src/routes/routesDependencies').default;
const {
  userAllDetail,
  userDetailAEN
} = require('../types/user');
const {
  GraphQLNonNull,
} = require('graphql');

let addUser = {
  'type': userAllDetail,
  'args': {
    'data': {
      'name': 'data',
      'type': new GraphQLNonNull(userDetailAEN)
    }
  },
  resolve(root, params) {
    const newUser = dependencies.userController.addUser(params.data);
    if (!newUser) {
      throw new Error('Error adding user');
    }
    return newUser;
  }
};

exports.default = {
  addUser
};