const User = {
  profile({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).profile();
  },
  qrcodes({ id }, _, { dataSources: { prisma } }) {
    return prisma.user({ id }).qrcodes();
  }
};

module.exports = User;
