const dependencies = require('../../src/routes/routesDependencies').default;
let {
  userAllDetail,
} = require('../types/user');
let {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const TAG = 'userQuery => Error';

let allUser,
  userByName,
  userById;

try {
  allUser = {
    'type': new GraphQLList(userAllDetail),
    resolve() {
      const users = dependencies.userController.allUser();
      if (!users) {
        i
        throw new Error('Error getting users');
      }
      return users;
    }
  };

  userByName = {
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

  userById = {
    'type': new GraphQLList(userAllDetail),
    'args': {
      'id': {
        'name': 'ID',
        'type': new GraphQLNonNull(GraphQLID)
      }
    },
    resolve(root, params) {
      const users = dependencies.userController.userById(params.id);
      if (!users) {
        throw new Error('Error getting users');
      }
      return users;
    }
  };
} catch (error) {
  console.log(`${TAG} : ${error}`);
  return {
    'error': error
  };
}

exports.default = {
  allUser,
  userByName,
  userById
};