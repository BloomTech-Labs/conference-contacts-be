const User = {
  profile({ id }, args, { prisma }, info) {
    return prisma.user({ id }).profile();
  }
};

module.exports = User;
