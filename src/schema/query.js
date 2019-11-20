const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]!
    user: User
  }
`;

module.exports = typeDefs;
