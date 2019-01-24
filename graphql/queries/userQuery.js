const dependencies = require('../../src/routes/routesDependencies').default;
let {
  userAllDetail
} = require('../types/user');
let {
  GraphQLList,
  GraphQLString
} = require('graphql');

let allUser = {
  'type': new GraphQLList(userAllDetail),
  resolve() {
    const users = dependencies.userController.allUser();
    if (!users) {
      throw new Error('Error getting users');
    }
    return users;
  }
};

let userByName = {
  'type': new GraphQLList(userAllDetail),
  'args': {
    'name': {
      'name': 'user name',
      'type': GraphQLString
    }
  },
  resolve(root, params) {
    const users = dependencies.userController.userByName(params.name);
    if (!users) {
      throw new Error('Error getting users');
    }
    return users;
  }
};


exports.default = {
  allUser,
  userByName
};