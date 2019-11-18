const Query = require('./Query');
const Mutation = require('./Mutation');

module.exports = {
  Query,
  Mutation,
  MutationResponse: {
    __resolveType(mutationResponse, context, info) {
      return null;
    }
  }
};
