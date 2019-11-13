const mutationSuccess = (code, message, fields) => ({
  code,
  message,
  success: true,
  ...fields
});

const mutationError = error => ({
  code: '500',
  success: false,
  message: `Something went wrong; ${error}`
});

const Mutation = {
  async createUser(parent, { data }, { prisma }, info) {
    try {
      const user = await prisma.createUser(data);
      return mutationSuccess(201, 'Welcome!', { user });
    } catch (error) {
      return mutationError(error);
    }
  },
  async updateUser(parent, { id, data }, { prisma }, info) {
    try {
      const user = await prisma.updateUser({ data, where: { id } });
      return mutationSuccess(200, 'Update successful!', { user });
    } catch (error) {
      return mutationError(error);
    }
  },
  async deleteUser(parent, { id }, { prisma }, info) {
    try {
      const user = await prisma.deleteUser({ id });
      return mutationSuccess(204, 'User deleted successfully.', { user });
    } catch (error) {
      return mutationError(error);
    }
  },

  // Mutation Profile Field
  async createProfileField(parent, { user: id, data }, { prisma }, info){
    try {
      const profileField = await prisma.createProfileField({ user: id, data })
      return mutationSuccess(200, 'Created profile field successfully!', { profileField } )
    } catch (error) {
      return mutationError(error);
    }
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
  async deleteUser(parent, { id }, { prisma }, info) {
    try {
      const user = await prisma.deleteUser({ id });
      return mutationSuccess(204, 'User deleted successfully.', { user });
    } catch (error) {
      return mutationError(error);
    }
  }
};

module.exports = Mutation;
