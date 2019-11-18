"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "ProfileField",
    embedded: false
  },
  {
    name: "ProfileFieldType",
    embedded: false
  },
  {
    name: "ProfileFieldPrivacy",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://lambda-swaap-af041a92a5.herokuapp.com/prisma-swaap/dev`
});
exports.prisma = new exports.Prisma();
