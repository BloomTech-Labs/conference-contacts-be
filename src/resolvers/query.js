const Query = {
  users(parent, args, { dataSources: { prisma } }, info) {
    return prisma.users();
  },
  user(parent, args, { dataSources: { prisma }, user }, info) {
    return prisma.user({ authId: user.authId });
  }
};

module.exports = Query;
