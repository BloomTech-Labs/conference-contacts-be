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
  async createUser(parent, { token, data }, { prisma }, info) {
    try {
      const authId = token.split('|')[1];
      const userExists = await prisma.$exists.user({ authId })
      if (!userExists) {
        const { name, picture, email } = data;
        const user = await prisma.createUser({ authId, name, picture });
        await prisma.createProfileField({
          value: email,
          type: 'EMAIL',
          privacy: 'PRIVATE',
          user: { connect: { authId } }
        });
        return mutationSuccess(201, 'User creation successful!', { user });
      }
      const user = await prisma.user({ authId });
      return mutationSuccess(200, 'User already exists.', { user });
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
  async createProfileField(parent, { data }, { prisma }, info) {
    try {
      const { value, type, privacy, authId } = data;
      const profileField = await prisma.createProfileField({
        value, type, privacy,
        user: { connect: { authId } }
      });
      return mutationSuccess(201, 'Profile fields created successfully!', {
        profileField
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async deleteProfileField(parent, { id }, { prisma }, info) {
    try {
      const profileField = await prisma.deleteProfileField({ id });
      return mutationSuccess(204, 'User deleted successfully.', {
        profileField
      });
    } catch (error) {
      return mutationError(error);
    }
  }
};

module.exports = Mutation;
