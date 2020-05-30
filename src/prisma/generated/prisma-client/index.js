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
  },
  {
    name: "QRCode",
    embedded: false
  },
  {
    name: "Connection",
    embedded: false
  },
  {
    name: "ConnectionStatus",
    embedded: false
  },
  {
    name: "Notification",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://lambda-swaap-b5a9ceec8c.herokuapp.com/swaap/prod`
});
exports.prisma = new exports.Prisma();
