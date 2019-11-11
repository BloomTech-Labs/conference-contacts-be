const { ApolloServer, gql } = require('apollo-server');
const { Query } = require('./resolvers/Query');
const { prisma } = require('./generated/prisma-client');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
type Query {
  users: [User!]!
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

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = { Query };

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