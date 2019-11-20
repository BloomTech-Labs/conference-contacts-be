const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.users();
  },
  user(parent, args, { prisma, user }, info) {
    return prisma.user({ authId: user.authId });
  }
};

module.exports = Query;
