const mutations = require('./mutations').default;
const queries = require('./queries').default;
const {
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql');

exports.default = new GraphQLSchema({
  'query': new GraphQLObjectType({
    'name': 'Query',
    'fields': queries
  }),
  'mutation': new GraphQLObjectType({
    'name': 'Mutation',
    'fields': mutations
  })
});