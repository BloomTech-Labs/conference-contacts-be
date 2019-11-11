const { ApolloServer, gql } = require('apollo-server');
const { prisma } = require('./generated/prisma-client');

const typeDefs = gql`
type Query {
  users: [User!]!
}

type Mutation {
}

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

type Conference {
  id: ID! @unique @id
  title: String
  start_date: DateTime!
  end_date: DateTime!
  location: Coordinate
  attendees: [User!]!
}

type Coordinate {
  id: ID! @unique @id
  latitude: Float!
  longitude: Float!
}

type ManualContact {
  id: ID! @unique @id
  name: String
  profile: [ProfileField!]!
}

type ProfileField {
  id: ID! @unique @id
  user: User
  manualContacts: [ManualContact!]!
  value: String
  type: Info
  privacy: Privacy
}

type Connection {
  id: ID! @unique @id
  sender: User @relation(name: "SendingConnection")
  recipient: User @relation(name: "ReceivingConnection")
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

# enum Gender {
#   MALE
#   FEMALE
#   NONBINARY
# }

enum Privacy {
  PUBLIC
  PRIVATE
  CONNECTED
}
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = { Query, Mutation };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});