const Mutation = {
  createUser(parent, args, { prisma }, info) {
    return prisma.createUser(args);
  },
  updateUser(parent, { id, ...changes }, { prisma }, info) {
    return prisma.updateUser({
      data: changes,
      where: { id }
    });
  },
  deleteUser(parent, { id }, { prisma }, info) {
    return prisma.deleteUser({ id });
  }
};

module.exports = Mutation;
