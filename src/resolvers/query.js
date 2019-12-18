const { AuthenticationError } = require('apollo-server');

const Query = {
  users(_, __, { dataSources: { prisma } }) {
    return prisma.users();
  },
  user(_, __, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('Invalid token');
    return prisma.user({ authId: user.authId });
  },
  qrcode(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('Invalid token');
    return prisma.qRCode({ id });
  }
};

module.exports = Query;
