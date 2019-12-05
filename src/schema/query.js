const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    """
    Returns all users; this query is temporary.
    """
    users: [User]!
    """
    Returns info for the logged in user.
    """
    user: User
  }
`;

module.exports = typeDefs;
