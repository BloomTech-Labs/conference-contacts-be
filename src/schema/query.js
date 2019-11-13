const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]!
    user(id: ID!): User
    conferences: [Conference]!
    conference(id: ID!): Conference
  }
`;

module.exports = typeDefs;