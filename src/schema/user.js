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
    tagline: String
    bio: String
    profile: [ProfileField]!
    qrcodes: [QRCode]!
    sentConnections: [Connection]!
    receivedConnections: [Connection]!
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

  type QRCode {
    id: ID!
    label: String
    scans: Int
    user: User
  }

  type Connection {
    id: ID!
    sender: User
    receiver: User
    status: ConnectionStatus
  }

  enum ConnectionStatus {
    PENDING
    CONNECTED
    BLOCKED
  }
`;

module.exports = typeDefs;
