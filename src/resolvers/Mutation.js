const Mutation = {
  // Mutation User
  createUser(parent, args, { prisma }, info) {
    return prisma.createUser(args);
  },
  updateUser(parent, { data: { id, ...changes } }, { prisma }, info) {
    return prisma.updateUser({
      data: changes,
      where: { id }
    });
  },
  deleteUser(parent, { id }, { prisma }, info) {
    return prisma.deleteUser({ id });
  },

  // Mutation Profile Field
  createProfileField(parent, { type, value }, { prisma }, info){
    return prisma.createProfileField({ type, value })
  },
  // updateProfileField(parent, { data: { id, ...changes } }, { prisma }, info){
  //   return prisma.updateProfileField({
  //     data: changes,
  //     where: { id }
  //   })
  // },
  // deleteProfileField(parent, { id }, { prisma }, info){
  //   return this.deleteProfileField({ id })
  // },

  // // Mutation Connection
  // createConnection(parent, args, { prisma }, info){
  //   return prisma.createConnection(args)
  // },
  // updateConnection(parent, { id, ...changes }, { prisma }, info){
  //   return prisma.updateConnection({
  //     data: changes,
  //     where: { id }
  //   })
  // },
  // deleteConnection(parent, { id }, { prisma }, info){
  //   return prisma.deleteConnection({ id })
  // },

  // // Mutation Manual Contact
  // createManualContact(parent, args, { prisma }, info){
  //   return prisma.createManualContact(args)
  // },
  // updateManualContact(parent, { id, ...changes }, { prisma }, info){
  //   return prisma.updateManualContacts({
  //     data: changes,
  //     where: { id }
  //   })
  // },
  // deleteManualContact(parent, { id }, { prisma }, info){
  //   return prisma.deleteManualContact({ id })
  // },

  // // Mutation Conference
  // createConference(parent, args, { prisma }, info){
  //   return prisma.createConference(args)
  // },
  // updateConference(parent, { id, ...changes }, { prisma }, info){
  //   return prisma.updateConference({
  //     data: changes,
  //     where: { id }
  //   })
  // },
  // deleteConference(parent, { id }, { prisma }, info){
  //   return this.deleteConference({ id })
  // },

  // // Mutation Coordinate
  // createCoordinate(parent, args, { prisma }, info){
  //   return prisma.createCoordinate(args)
  // },
  // updateCoordinate(parent, { id, ...changes }, { prisma }, info){
  //   return prisma.updateCoordinate({
  //     data: changes,
  //     where: { id }
  //   })
  // },
  // deleteCoordinate(parent, { id }, { prisma }, info){
  //   return this.deleteCoordinate({ id })
  // },
};

module.exports = Mutation;
