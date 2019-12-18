const QRCode = {
  user({ id }, _, { dataSources: { prisma } }) {
    return prisma.qRCode({ id }).user();
  }
};

module.exports = QRCode;
