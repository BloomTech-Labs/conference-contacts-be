const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    profile: [ProfileField!]!
    sent_requests: [Connection!]!
    received_requests: [Connection!]!
    manualContacts: [ManualContact!]!
    conferences: [Conference!]!
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