const { AuthenticationError, UserInputError } = require('apollo-server');

const Query = {
  users(_, __, { dataSources: { prisma } }) {
    return prisma.users();
  },
  async user(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('Invalid token');
    if (!id || id === user.id) return prisma.user({ id: user.id });
    if (!(await prisma.$exists.user({ id }))) throw new UserInputError('User does not exist');
    return prisma.user({ id });
  },
  qrcode(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('Invalid token');
    return prisma.qRCode({ id });
  }
};

module.exports = Query;
