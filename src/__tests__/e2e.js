// import our production apollo-server instance
const { server } = require('../');
const gql = require('graphql-tag');

const { startTestServer, toPromise } = require('./__utils');

const GET_USER = gql`
  query UserList {
    user {
      name
      profile {
        type
        value
        privacy
      }
    }
  }
`;

describe('Server - e2e', () => {
  let stop, graphql;

  beforeEach(async () => {
    const testServer = await startTestServer(server);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(() => stop());

  it('gets user profile', async () => {
    const res = await toPromise(
      graphql({
        query: GET_USER
      })
    );

    expect(res).toMatchSnapshot();
  });
});
