const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]!
    user(id: ID!): User
    conferences: [Conference]!
    conference(id: ID!): Conference
  }

  type Mutation {
    createUser(data: UserCreateInput!): User!
    updateUser(data: UserUpdateInput!): User!
    deleteUser(id: ID!): User
  }

  input UserCreateInput {
    name: String!
  }

  input UserUpdateInput {
    id: ID!
    name: String!
  }

  type User {
    id: ID!
    uuid: String!
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