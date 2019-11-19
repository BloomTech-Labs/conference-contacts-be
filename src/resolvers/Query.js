const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.users();
  },
  user(parent, { id }, { prisma }, info) {
    return prisma.users({ id });
  }
};

module.exports = Query;
