const Query = require('./Query');
const authResolvers = require('./auth');
module.exports = {
  Query,
  Mutation: {
    ...authResolvers.Mutation
  }
};
