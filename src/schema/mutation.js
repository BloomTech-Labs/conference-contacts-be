const { gql } = require('apollo-server');

const typeDefs = gql`
  type Mutation {
    """
    Creates a new user.
    """
    createUser(data: CreateUserInput!): UserMutationResponse!
    """
    Updates information for the logged in user.
    """
    updateUser(data: UpdateUserInput!): UserMutationResponse!
    """
    Deletes the currently logged in user.
    """
    deleteUser: UserMutationResponse!
    """
    Creates a profile field for the logged in user.
    """
    createProfileField(data: CreateProfileFieldInput!): ProfileMutationResponse!
    """
    Create multiple profile fields.
    """
    createProfileFields(data: [CreateProfileFieldInput]!): ProfileMutationsResponse!
    """
    Updates information for a specific profile field.
    """
    updateProfileField(id: ID!, data: UpdateProfileFieldInput!): ProfileMutationResponse!
    """
    Updates multiple profile fields.
    """
    updateProfileFields(data: [UpdateProfileFieldsInput]!): ProfileMutationsResponse!
    """
    Deletes a user's profile field (users can only delete their _own_ profile fields)
    """
    deleteProfileField(id: ID!): ProfileMutationResponse!
    """
    Deletes multiple profile fields.
    """
    deleteProfileFields(ids: [ID]!): ProfileMutationsResponse!
    """
    Creates a QRCode entry for a user.
    """
    createQRCode(label: String!): QRCodeResponse!
    """
    Creates a connection request to the specified user.
    """
    createConnection(userID: ID!, senderCoords: CoordinatesInput!): ConnectionResponse!
    """
    Accepts an incoming connection request.
    """
    acceptConnection(id: ID!, receiverCoords: CoordinatesInput!): ConnectionResponse!
    """
    Blocks an existing connection.
    """
    blockConnection(id: ID!): ConnectionResponse!
    """
    Deletes a connection entirely.
    """
    deleteConnection(id: ID!): ConnectionResponse!
    """
    Deletes a notification.
    """
    deleteNotification(id: ID!): NotificationResponse!
    """
    Updates a connection note.
    """
    updateConnectionNote(id: ID!, senderNote: String, receiverNote: String): ConnectionResponse!
    """
    Updates an event name
    """
    updateConnectionEvent(id: ID!, senderEvent: String, receiverEvent: String): ConnectionResponse!
  }

  input CreateUserInput {
    name: String
    picture: String
    birthdate: String
    location: String
    industry: String
    jobtitle: String
    tagline: String
    bio: String
    email: String
    username: String
  }

  input UpdateUserInput {
    name: String
    picture: String
    birthdate: String
    location: String
    industry: String
    jobtitle: String
    tagline: String
    bio: String
    email: String
    username: String
  }

  input CoordinatesInput {
    latitude: Float!
    longitude: Float!
  }

  input UpdateConnectionInput {
    status: ConnectionStatus!
    receiverCoordinates: CoordinatesInput
  }

  input CreateProfileFieldInput {
    value: String!
    type: ProfileFieldType!
    privacy: ProfileFieldPrivacy!
    preferredContact: Boolean
  }

  input UpdateProfileFieldInput {
    value: String
    type: ProfileFieldType
    privacy: ProfileFieldPrivacy
    preferredContact: Boolean
  }

  input UpdateProfileFieldsInput {
    id: ID!
    value: String
    type: ProfileFieldType
    privacy: ProfileFieldPrivacy
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
    user: User
  }

  type ProfileMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    profileField: ProfileField
  }

  type ProfileMutationsResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    profileFields: [ProfileField]!
  }

  type QRCodeResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    qrcode: QRCode
  }

  type ConnectionResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    connection: Connection
  }

  type NotificationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    notification: Notification
  }
`;


module.exports = typeDefs;
