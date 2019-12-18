const User = {
  profile({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).profile();
  },
  qrcodes({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).qrcodes();
  },
  sentConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).sentConnections();
  },
  receivedConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).receivedConnections();
  },
  async pendingConnections({ id }, _, { dataSources: { prisma } }) {
    const sentConnections = await prisma.user({ id }).sentConnections();
    const receivedConnections = await prisma.user({ id }).receivedConnections();
    return [...sentConnections, ...receivedConnections].filter(
      connection => connection.status === 'PENDING'
    );
  }
};

module.exports = User;
