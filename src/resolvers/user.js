const User = {
  async profile({ id }, _, { dataSources: { prisma }, user }) {
    const userProfile = await prisma.user({ id }).profile();

    if (id === user.id) return userProfile;

    const byPrivacy = visibility => field => visibility.includes(field.privacy);

    const [connection] = await prisma.connections({
      where: {
        OR: [
          { sender: { id: user.id }, receiver: { id } },
          { sender: { id }, receiver: { id: user.id } }
        ]
      }
    });

    if (!connection) return userProfile.filter(byPrivacy(['PUBLIC']));

    const blocker = await prisma.connection({ id: connection.id }).blocker();

    return userProfile.filter(
      byPrivacy(
        blocker || connection.status === 'PENDING'
          ? ['PUBLIC']
          : ['PUBLIC', 'CONNECTED']
      )
    );
  },
  qrcodes({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).qrcodes();
  },
  async connections({ id }, _, { dataSources: { prisma } }) {
    const connections = await prisma.connections({
      where: {
        OR: [{ sender: { id } }, { receiver: { id } }]
      }
    });
    return connections.filter(connection => connection.status === 'CONNECTED');
  },
  sentConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).sentConnections();
  },
  receivedConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).receivedConnections();
  },
  async pendingConnections({ id }, _, { dataSources: { prisma } }) {
    const connections = await prisma.connections({
      where: {
        OR: [{ sender: { id } }, { receiver: { id } }]
      }
    });
    return connections.filter(connection => connection.status === 'PENDING');
  },
  blockedConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).blockedConnections();
  }
};

module.exports = User;
