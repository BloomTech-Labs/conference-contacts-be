const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const gql = require("graphql-tag");
const EasyGraphQLTester = require("../lib");

const userSchema = fs.readFileSync(
  path.join(__dirname, "schema", "user.gql"),
  "utf8"
);
const familySchema = fs.readFileSync(
  path.join(__dirname, "schema", "family.gql"),
  "utf8"
);
const customRootTypeNamesSchema = fs.readFileSync(
  path.join(__dirname, "schema", "customRootTypeNames.gql"),
  "utf8"
);

describe("Query", () => {
  let tester;

  before(() => {
    const resolvers = {
      Query: {
        getMe: (root, args, ctx) => {
          return {
            id: "1",
            email: "demo@demo.com",
            username: "demo"
          };
        }
      }
    };
    tester = new EasyGraphQLTester([userSchema, familySchema], resolvers);
  });

  describe("Should throw an error if a field is missing", () => {
    it("Should throw an error if the operation name is invalid", () => {
      let error;
      try {
        const query = `
          {
            getUser {
              id
              invalidField
              familyInfo {
                father {
                  email
                  username
                }
              }
            }
          }
        `;
        tester.mock(query);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.be.eq(
        'Cannot query field "getUser" on type "Query". Did you mean "getUsers" or "getMe"?'
      );
    });

    it("Should throw an error with the invalid field", () => {
      let error;
      try {
        const query = `
          {
            getMe {
              id
              invalidField
              familyInfo {
                father {
                  email
                  username
                }
              }
            }
          }
        `;
        tester.mock(query);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.be.eq(
        'Cannot query field "invalidField" on type "Me".'
      );
    });