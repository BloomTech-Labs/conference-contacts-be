const { AuthenticationError, UserInputError } = require('apollo-server');

const Query = {
  // see notes in query schema for version details
  version: () => 1,
  // fyigurighe

  // GET USER
  async user(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');

    // ids are optional, so if we don't pass one (or we pass our own),
    // we want to return information for the currently logged in user
    if (!id || id === user.id) return prisma.user({ id: user.id });

    // otherwise, we're fetching data for another user (probably one
    // of our contacts) below
    if (!(await prisma.$exists.user({ id }))) {
      throw new UserInputError('User does not exist');
    }

    const userData = await prisma.user({ id });

    // does a connection exist between you two?
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
      // if there is no connection found, or it is pending, or someone has
      // been blocked, only return public data (defined below)
      for (const field in userData) {
        if (userData.hasOwnProperty(field)) {

          if (!['id', 'authId', 'name', 'picture', 'tagline','bio'].includes(field)) {
            userData[field] = null;
          }
        }
      }
    }

    return userData;
  },

  // GET QR CODE
  // (parent, args, context, info)
  qrcode(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    return prisma.qRCode({ id });
  }
};

module.exports = Query;
