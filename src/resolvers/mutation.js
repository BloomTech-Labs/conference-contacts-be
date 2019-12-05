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
  async createUser(parent, { data }, { dataSources: { prisma } }, info) {
    try {
      const { sub, email, ...fields } = data;
      const authId = sub.split('|')[1];
      const userExists = await prisma.$exists.user({ authId });
      if (!userExists) {
        const user = await prisma.createUser({ authId, ...fields });
        if (email)
          await prisma.createProfileField({
            value: email,
            type: 'EMAIL',
            privacy: 'PRIVATE',
            preferredContact: true,
            user: { connect: { authId } }
          });
        return mutationSuccess(201, 'User creation successful!', { user });
      } else {
        const user = await prisma.user({ authId });
        return mutationSuccess(409, 'User already exists.', { user });
      }
    } catch (error) {
      return mutationError(error);
    }
  },
  async updateUser(parent, { data }, { dataSources: { prisma }, user }, info) {
    try {
      const updatedUser = await prisma.updateUser({
        data,
        where: { id: user.id }
      });
      return mutationSuccess(200, 'Update successful!', { user: updatedUser });
    } catch (error) {
      return mutationError(error);
    }
  },
  async deleteUser(parent, args, { dataSources: { prisma }, user }, info) {
    try {
      const user = await prisma.deleteUser({ id: user.id });
      return mutationSuccess(204, 'Profile deletion was successful.', { user });
    } catch (error) {
      return mutationError(error);
    }
  },
  async createProfileField(parent, { data }, { dataSources: { prisma, user } }, info) {
    try {
      const { value, type, privacy, preferredContact } = data;
      const profileField = await prisma.createProfileField({
        value,
        type,
        privacy,
        preferredContact,
        user: { connect: { id: user.id } }
      });
      return mutationSuccess(201, 'Profile fields created successfully!', {
        profileField
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async deleteProfileField(parent, { id }, { dataSources: { prisma }, user }, info) {
    try {
      const fieldExists = await prisma.$exists.profileField({
        id,
        user: { id: user.id }
      });

      if (!fieldExists) return mutationError('Nice try, mister.');

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
