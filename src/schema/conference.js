const { gql } = require('apollo-server');

const typeDefs = gql`
  type Conference {
    id: ID!
    title: String
    start_date: String!
    end_date: String!
    location: Coordinate
    attendees: [User!]!
  }

  type Coordinate {
    id: ID!
    latitude: Float!
    longitude: Float!
  }
`;

module.exports = typeDefs;