const { AuthenticationError, UserInputError } = require('apollo-server');

const Query = {
  users(_, __, { dataSources: { prisma } }) {
    return prisma.users();
  },
  async user(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    if (!id || id === user.id) return prisma.user({ id: user.id });
    if (!(await prisma.$exists.user({ id })))
      throw new UserInputError('User does not exist');

    const userData = prisma.user({ id });

    const [connection] = await prisma.connections({
      where: {
        OR: [
          { sender: { id: user.id }, receiver: { id } },
          { sender: { id }, receiver: { id: user.id } }
        ]
      }
    });

    if (
      !connection ||
      connection.status === 'PENDING' ||
      (await prisma.connection({ id: connection.id }).blocker())
    ) {
      for (const field in userData) {
        if (userData.hasOwnProperty(field)) {
          if (!['id', 'name', 'picture', 'tagline'].includes(field)) {
            userData[field] = null;
          }
        }
      }
    }

    return userData;
  },
  qrcode(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('Invalid token');
    return prisma.qRCode({ id });
  }
};

module.exports = Query;
