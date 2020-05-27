// Apollo Server
const { ApolloServer } = require('apollo-server');

// Auth0 Config
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: `https://dev-1lez5gah.auth0.com/.well-known/jwks.json`
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, function (err, key) {
    let signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: 'https://api.swaap.co/',
  issuer: `https://dev-1lez5gah.auth0.com/`,
  algorithms: ['RS256']
};

// Resolvers define the technique for fetching the types defined
// in the schema.
const resolvers = require('./resolvers');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = require('./schema');

// Prisma allows us to interact with our database
const { prisma } = require('./prisma/generated/prisma-client');

// set up the data source our resolvers need
const dataSources = () => ({ prisma });

// Fetch existing user data from the received auth token
function getUser(token) {
  return new Promise((resolve, reject) => {
    if (!token || token === '') resolve(null);
    jwt.verify(token, getKey, options, async (err, decoded) => {
      if (err) reject(err);
      try {
        // auth0 ids show up like google|blahrandomid or apple|blahrandomid
        // the id after the bar is unique regardless of auth method
        const authId = decoded.sub.split('|')[1];
        const user = await prisma.user({ authId });
        resolve({ decoded, user });
      } catch (error) {
        reject(error);
      }
    });
  });
}

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => ({
  ...await getUser(req.headers.authorization)
});


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: process.env.ENGINE_SCHEMA_TAG
  }
});

// The `listen` method launches a web server.
// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  prisma,
  server
};
