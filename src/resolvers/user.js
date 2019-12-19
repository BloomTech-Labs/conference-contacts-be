const User = {
  async profile({ id }, _, { dataSources: { prisma }, user }) {
    if (id === user.id) return prisma.user({ id }).profile();

    const [connection] = await prisma.connections({
      where: {
        sender: { id: user.id },
        receiver: { id }
      }
    });

    if (connection && connection.status === 'BLOCKED')
      throw new Error("They don't like you.");

    const filters = {
      PENDING: field => field.privacy === 'PUBLIC',
      CONNECTED: field => ['PUBLIC', 'CONNECTED'].includes(field.privacy)
    };

    const userProfile = await prisma.user({ id }).profile();

    return connection
      ? userProfile.filter(filters[connection.status])
      : userProfile.filter(filters.PENDING);
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
  },
  async connections({ id }, _, { dataSources: { prisma } }) {
    const sentConnections = await prisma.user({ id }).sentConnections();
    const receivedConnections = await prisma.user({ id }).receivedConnections();
    return [...sentConnections, ...receivedConnections].filter(
      connection => connection.status === 'CONNECTED'
    );
  }
};

module.exports = User;
