const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]!
    user(id: ID!): User
    conferences: [Conference]!
    conference(id: ID!): Conference
  }

  type Mutation {
    createUser(data: CreateUserInput!): UserMutationResponse!
    updateUser(id: ID!, data: UpdateUserInput!): UserMutationResponse
    deleteUser(id: ID!): UserMutationResponse
  }

  input CreateUserInput {
    name: String!
  }

  input UpdateUserInput {
    name: String
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

  type User {
    id: ID!
    name: String!
    profile: [ProfileField!]!
    sent_requests: [Connection!]!
    received_requests: [Connection!]!
    manualContacts: [ManualContact!]!
    conferences: [Conference!]!
  }

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

  type ManualContact {
    id: ID!
    name: String
    profile: [ProfileField!]!
  }

  type ProfileField {
    id: ID!
    user: User
    manualContacts: [ManualContact!]!
    value: String
    type: Info
    privacy: Privacy
  }

  type Connection {
    id: ID!
    sender: User
    recipient: User
    status: ConnectionStatus
  }

  enum ConnectionStatus {
    PENDING
    CONNECTED
    BLOCKED
  }

  enum Info {
    EMAIL
    PHONE
    SOCIAL
    AGE
    GENDER
    INDUSTRY
    JOBTITLE
    BIO
  }

  enum Privacy {
    PUBLIC
    PRIVATE
    CONNECTED
  }
`;

module.exports = typeDefs;