const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

exports.userAllDetail = new GraphQLObjectType({
  'name': 'Userdetail_all',
  'fields': () => ({
    '_id': {
      'type': new GraphQLNonNull(GraphQLID)
    },
    'name': {
      'type': GraphQLString
    },
    'email': {
      'type': GraphQLString
    },
    'address': {
      'type': GraphQLString
    }
  })
});

exports.userDetailAEN = new GraphQLInputObjectType({
  'name': 'Userdetail_email_name_address',
  'fields': () => ({
    'name': {
      'type': GraphQLString
    },
    'email': {
      'type': GraphQLString
    },
    'address': {
      'type': GraphQLString
    }
  })
});
