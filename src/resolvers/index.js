const Query = require('./query');
const Mutation = require('./mutation');
const User = require('./user');

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
