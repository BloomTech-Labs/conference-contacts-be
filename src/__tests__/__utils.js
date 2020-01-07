const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { execute, toPromise } = require('apollo-link');

module.exports.toPromise = toPromise;

const {
  dataSources,
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  prisma
} = require('../');

/**
 * Integration testing utils
 */

const constructTestServer = ({ context = defaultContext } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ prisma }),
    context,
    engine: false
  });

  return { server, prisma };
};

module.exports.constructTestServer = constructTestServer;

/**
 * e2e Testing Utils
 */

const startTestServer = async server => {
  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
    headers: {
      authorization: process.env.TEST_TOKEN
    }
  });

  jest.setTimeout(15000);

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation
  };
};

module.exports.startTestServer = startTestServer;
