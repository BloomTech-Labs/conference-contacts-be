// const postsResolvers = require('./posts');
const authResolvers = require('./auth');
module.exports = {
  // Query:{
  //   ...postsResolvers.Query
  // },
  Mutation: {
    ...authResolvers.Mutation
  }
};
