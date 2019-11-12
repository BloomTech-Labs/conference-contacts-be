const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.users();
  },
  user(parent, { id }, { prisma }, info) {
    return prisma.user({ id });
  }
};

module.exports = Query;
