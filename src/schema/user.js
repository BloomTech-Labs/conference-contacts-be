const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    profile: [ProfileField]!
  }

  type ProfileField {
    id: ID!
    userId: String!
    value: String!
    type: ProfileFieldType!
    privacy: ProfileFieldPrivacy!
  }

  enum ProfileFieldType {
    EMAIL
    PHONE
    SOCIAL
    AGE
    GENDER
    INDUSTRY
    JOBTITLE
    BIO
  }

  enum ProfileFieldPrivacy {
    PUBLIC
    PRIVATE
    CONNECTED
  }
`;

module.exports = typeDefs;
