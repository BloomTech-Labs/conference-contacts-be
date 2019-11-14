const {createTestClient} = require('apollo-server-testing');
const gql = require('graphql-tag');
const nock = require('nock');

const {constructTestServer} = require('./__utils');

// the mocked SQL DataSource store
const {mockStore} = require('../datasources/__tests__/user');

const LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

describe('Mutations', () => {
  it('returns login token', async () => {
    const {server, launchAPI, userAPI} = constructTestServer({
      context: () => {},
    });

    userAPI.store = mockStore;
    userAPI.store.users.findOrCreate.mockReturnValueOnce([
      {id: 1, email: 'a@a.a'},
    ]);

    const {mutate} = createTestClient(server);
    const res = await mutate({
      mutation: LOGIN,
      variables: {email: 'a@a.a'},
    });
    expect(res.data.login).toEqual('YUBhLmE=');
  });