"use strict";

const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const EasyGraphQLTester = require("easygraphql-tester");

const resolvers = require("../resolvers");
const schemaCode = fs.readFileSync(
  path.join(__dirname, "schema", "index.js"),
  "utf8"
);

describe("Test resolvers", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode, resolvers);
  });

  it("should return expected values", async () => {
    const query = `
      query GET_LICENSE($key: String!) {
        license(key: $key) {
          id
          body
          description
        }
      }
    `;

    const args = {
      key: "1234"
    };

    const result = await tester.graphql(query, {}, {}, args);
    expect(result.data.license.id).to.be.eq("1234");
    expect(result.data.license.body).to.be.eq("This is a test license");
    expect(result.data.license.description).to.be.eq(
      `This is a description with key ${args.key}`
    );
  });
});