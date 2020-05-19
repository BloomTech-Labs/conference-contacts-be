const Connection = {
  receiver({ id }, _, { dataSources: { prisma } }) {
    return prisma.connection({ id }).receiver();
  },
  sender({ id }, _, { dataSources: { prisma } }) {
    return prisma.connection({ id }).sender();
  },
  receiverNote({ id }, _, { dataSources: { prisma } }) {
    return prisma.connection({ id }).receiverNote();
  },
  senderNote({ id }, _, { dataSources: { prisma } }) {
    return prisma.connection({ id }).senderNote();
  }
};

module.exports = Connection;
