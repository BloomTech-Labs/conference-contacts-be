const Query = require('./query');
const Mutation = require('./mutation');
const User = require('./user');
const QRCode = require('./qrcode');
const Connection = require('./connection');

module.exports = {
  Query,
  Mutation,
  MutationResponse: {
    __resolveType(mutationResponse, context, info) {
      return null;
    }
  },
  User,
  QRCode,
  Connection
};
