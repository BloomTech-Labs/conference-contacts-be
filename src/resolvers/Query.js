const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.users();
  },
  user(parent, { email }, { prisma }, info) {
    return prisma.user({ email });
  }
};

module.exports = Query;
