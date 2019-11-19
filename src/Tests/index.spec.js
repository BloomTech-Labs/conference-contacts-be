import  {ApolloServer}  from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

const prepareServer = async () => {
  // creating your real schema
  const schema = await Schemas.getSchemas();
  return new ApolloServer({
    schema,
	typeDefs,
    resolvers
   /* dataSources: () => ({
      data: new MockDatasource(), // provides mocked data
    })*/
  });
};

it('test query', async () => {
  const server = await prepareServer();
  const { query } = createTestClient(server);

  const result = await query({ query: QUERY_GQL });
  // test result data
});