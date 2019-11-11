const { gql } = require('apollo-server');

const user = gql`
  type User {
    id: ID! @id
    uuid: String! # research default uuid value here
    name: String!
    profile: [ProfileField!]!
    sent_requests: [Connection!]! @relation(name: "SendingConnection")
    received_requests: [Connection!]! @relation(name: "ReceivingConnection")
    manualContacts: [ManualContact!]!
    conferences: [Conference!]!
  }

  type Query {
    users: [User!]!
  }
`;

module.exports = user;