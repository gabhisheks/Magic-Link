const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
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

exports.userDetailN = new GraphQLInputObjectType({
  'name': 'Userdetail_name',
  'fields': () => ({
    'name': {
      'type': GraphQLString
    }
  })
});