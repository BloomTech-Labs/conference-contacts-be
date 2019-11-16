const User = {
  profile(parent, args, { prisma }, info) {
    return prisma.profileFields({ where: { authId: parent.id } });
  }
};

module.exports = User;
