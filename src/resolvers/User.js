const User = {
  profile(parent, args, { prisma }, info) {
    return prisma.profileFields({ where: { userId: parent.id } });
  }
};

module.exports = User;
