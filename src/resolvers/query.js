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

    return userData.map(
      byPrivacy(
        !connection ||
          connection.status === 'PENDING' ||
          (await prisma.connection({ id: connection.id }).blocker())
          ? '!'
          : '*'
      )
    );

    return prisma.user({ id });
  },
  qrcode(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('Invalid token');
    return prisma.qRCode({ id });
  }
};

module.exports = Query;
