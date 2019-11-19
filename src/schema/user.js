const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    authId: String!
    name: String
    picture: String
    birthdate: String
    gender: GenderType
    industry: String
    jobtitle: String
    bio: String
    profile: [ProfileField]!
  }

  enum GenderType {
    MALE
    FEMALE
    NONBINARY
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
    SOCIAL
  }

  enum ProfileFieldPrivacy {
    PUBLIC
    PRIVATE
    CONNECTED
  }
`;

module.exports = typeDefs;
