const Query = require('./Query');
const Mutation = require('./Mutation');
const User = require('./User');

module.exports = {
  Query,
  Mutation,
  MutationResponse: {
    __resolveType(mutationResponse, context, info) {
      return null;
    }
  },
  User
};
