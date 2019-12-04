const { gql } = require('apollo-server');

const typeDefs = gql`
  type Mutation {
    createUser(data: CreateUserInput!): UserMutationResponse!
    updateUser(data: UpdateUserInput!): UserMutationResponse
    createProfileField(data: CreateProfileFieldInput!): ProfileMutationResponse
    deleteProfileField(id: ID!): ProfileMutationResponse
  }

  input CreateUserInput {
    sub: String!
    name: String
    picture: String
    birthdate: String
    gender: GenderType
    industry: String
    jobtitle: String
    bio: String
    email: String
  }

  input UpdateUserInput {
    name: String
    picture: String
    birthdate: String
    gender: GenderType
    industry: String
    jobtitle: String
    bio: String
    email: String
  }

  input CreateProfileFieldInput {
    value: String!
    authId: String!
    type: ProfileFieldType!
    privacy: ProfileFieldPrivacy!
    preferredContact: Boolean
  }

  interface MutationResponse {
    """
    A number that represents the status of the data transfer. Think of it like an HTTP status code.
    """
    code: Int!
    """
    A boolean that indicates whether the mutation was successful.
    """
    success: Boolean!
    """
    A human-readable string that describes the result of the mutation. It is intended to be used in the UI of the product.
    """
    message: String!
  }

  type UserMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User!
  }

  type ProfileMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    profileField: ProfileField!
  }
`;

module.exports = typeDefs;
