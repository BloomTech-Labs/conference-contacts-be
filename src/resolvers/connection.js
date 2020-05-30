const Connection = {
  receiver({ id }, _, { dataSources: { prisma } }) {
    return prisma.connection({ id }).receiver();
  },
  sender({ id }, _, { dataSources: { prisma } }) {
    return prisma.connection({ id }).sender();
  }
};

module.exports = Connection;
