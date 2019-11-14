const { ApolloServer, gql, AuthenticationError } = require('apollo-server');

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
  audience: '4fdSpYCb8sYy7diMO0fnsr5jEt501OZg',
  issuer: `https://dev-1lez5gah.auth0.com/`,
  algorithms: ['RS256']
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = require('./resolvers');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = require('./schema');

// Prisma allows us to interact with our database
const { prisma } = require('./generated/prisma-client');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (!token) return {prisma};
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if (err) {
          return reject(err)
        }
        resolve(decoded.email)
      })
    });

    return {user, prisma}
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
