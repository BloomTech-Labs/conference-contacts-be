"use strict";

const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const EasyGraphQLTester = require("easygraphql-tester");

const resolvers = require("../resolvers/index");
const schemaCode = fs.readFileSync(
  path.join(__dirname, "../resolvers", "index.js"),
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
          name
          profile
        }
      }
    `;

    const args = {
      key: "1"
    };

    //const result = await tester.graphql(query, {}, {}, args);
    expect(id).toBe("1");
    expect(name).toBe("Jonathan Picazo");
    expect(profile).toBe([ProfileField]
      //`This is a description with key ${args.key}`
    );
  });
});