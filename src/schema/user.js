const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    authId: String!
    name: String
    picture: String
    birthdate: String
    location: String
    industry: String
    jobtitle: String
    bio: String
    profile: [ProfileField]!
  }

  type ProfileField {
    id: ID!
    user: User!
    value: String!
    type: ProfileFieldType!
    privacy: ProfileFieldPrivacy!
    preferredContact: Boolean
  }

  enum ProfileFieldType {
    EMAIL
    PHONE
    SMS
    INSTAGRAM
    FACEBOOK
    LINKEDIN
    TWITTER
  }

  enum ProfileFieldPrivacy {
    PUBLIC
    PRIVATE
    CONNECTED
  }
`;

module.exports = typeDefs;
