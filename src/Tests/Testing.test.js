const axios = require ('axios');
const { XMLHttpRequest } = require ('xmlhttprequest');

global.XMLHttpRequest = XMLHttpRequest;

describe('user resolvers', () => {
  test('users',  () => {
    const response = axios.post('https://lambda-labs-swaap-staging.herokuapp.com/graphql', {
      query: `
      query {
        user {
          id
          name
          profile {
            id
            userId
            value
            type{
              {
                EMAIL
                PHONE
                SOCIAL
                AGE
                GENDER
                INDUSTRY
                JOBTITLE
                BIO
              }
            }
            privacy{
              PUBLIC
              PRIVATE
              CONNECTED
            }

          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        users: [],
      },
    });
  });

})