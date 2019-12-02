const User = {
  profile({ id }, args, { dataSources: { prisma } }, info) {
    return prisma.user({ id }).profile();
  }
};

module.exports = User;
