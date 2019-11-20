const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.users();
  },
  async user(parent, { id }, { prisma, user }, info) {
    await user;
    return prisma.user({ id: user.id });
  }
};

module.exports = Query;
