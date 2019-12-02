const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');
const { constructTestServer } = require('./__utils');

const GET_USER = gql`
  query UserProfile {
    user {
      name
      picture
      birthdate
      gender
      industry
      jobtitle
      bio
      profile {
        value
        type
        privacy
        preferredContact
      }
    }
  }
`;

const mockUserResponse = {
  name: 'Tyler Quinn',
  picture: 'quinn.png',
  birthdate: '2/5/1995',
  gender: 'NONBINARY',
  industry: 'Development',
  jobtitle: 'Software Engineer',
  bio: 'I love testing!!!!!!'
};

const mockProfileResponse = [
  {
    value: 'nicetry@gmail.com',
    type: 'EMAIL',
    privacy: 'CONNECTED',
    preferredContact: true
  }
];

describe('Queries', () => {
  it('fetches list of users', async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing resolvers and typeDefs.
    // This function returns the server instance as well as our prisma
    // instance, so we can overwrite the underlying fetchers
    const { server, prisma } = constructTestServer({
      context: () => ({
        user: { name: 'Tyler Quinn', email: 'nicetry@gmail.com' }
      })
    });

    // mock prisma's underlying user lookup method
    prisma.user = jest.fn(() => mockUserResponse);
    prisma.user().profile = jest.fn(() => mockProfileResponse);

    // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const { query } = createTestClient(server);
    const res = await query({ query: GET_USER });
    expect(res).toMatchSnapshot();
  });
});
