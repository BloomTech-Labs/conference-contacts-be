const User = {

  // GET PROFILE
  async profile({ id }, _, { dataSources: { prisma }, user }) {
    const userProfile = await prisma.user({ id }).profile();

    // return profile data for the current logged in user if
    // the id is the same as the user making the request
    if (id === user.id) return userProfile;

    // otherwise, we're fetching data for another user (most likely
    // one of our contacts)
    const byPrivacy = visibility => field => visibility.includes(field.privacy);

    const [connection] = await prisma.connections({
      where: {
        OR: [
          { sender: { id: user.id }, receiver: { id } },
          { sender: { id }, receiver: { id: user.id } }
        ]
      }
    });

    // only return "connected" data if you're connected and unblocked
    // otherwise return public data
    return userProfile.filter(
      byPrivacy(
        !connection ||
          connection.status === 'PENDING' ||
          (await prisma.connection({ id: connection.id }).blocker())
          ? ['PUBLIC']
          : ['PUBLIC', 'CONNECTED']
      )
    );
  },

  // GET QR CODES
  qrcodes({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).qrcodes();
  },

  // GET CONNECTIONS
  async connections({ id }, _, { dataSources: { prisma } }) {
    const connections = await prisma.connections({
      where: {
        OR: [{ sender: { id } }, { receiver: { id } }]
      }
    });
    return connections.filter(connection => connection.status === 'CONNECTED');
  },

  // GET SENT CONNECTIONS
  sentConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).sentConnections();
  },

  // GET RECEIVED CONNECTIONS
  receivedConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).receivedConnections();
  },

  // GET PENDING CONNECTIONS
  async pendingConnections({ id }, _, { dataSources: { prisma } }) {
    const connections = await prisma.connections({
      where: {
        OR: [{ sender: { id } }, { receiver: { id } }]
      }
    });
    return connections.filter(connection => connection.status === 'PENDING');
  },

  // GET BLOCKED CONNECTIONS
  // TODO: not implemented on the frontend
  blockedConnections({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).blockedConnections();
  },

  // GET NOTIFICATIONS
  notifications({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).notifications();
  }
};

module.exports = User;
