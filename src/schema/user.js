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
    connections: [Connection]!
    sentConnections: [Connection]!
    receivedConnections: [Connection]!
    pendingConnections: [Connection]!
    blockedConnections: [Connection]!
    notifications: [Notification]!
    username: String
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
    blocker: User
    status: ConnectionStatus
    senderLat: Float
    senderLon: Float
    receiverLat: Float
    receiverLon: Float
    location: String
    senderNote: String
    receiverNote: String
    senderEvent: String
    receiverEvent: String
  }

  enum ConnectionStatus {
    PENDING
    CONNECTED
  }

  type Notification {
    id: ID!
    message: String!
    user: User!
  }
`;

module.exports = typeDefs;
