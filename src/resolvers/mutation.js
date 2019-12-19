const { AuthenticationError, UserInputError } = require('apollo-server');

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
  async createUser(_, { data }, { dataSources: { prisma }, decoded }) {
    try {
      const authId = decoded.sub.split('|')[1];
      const userExists = await prisma.$exists.user({ authId });
      if (!userExists) {
        const { email, ...fields } = data;
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
  async updateUser(_, { data }, { dataSources: { prisma }, user }) {
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
  async deleteUser(_, __, { dataSources: { prisma }, user: { id } }) {
    try {
      const user = await prisma.deleteUser({ id });
      return mutationSuccess(204, 'Profile deletion was successful.', { user });
    } catch (error) {
      return mutationError(error);
    }
  },
  async createProfileField(_, { data }, { dataSources: { prisma }, user }) {
    try {
      const profileField = await prisma.createProfileField({
        ...data,
        user: { connect: { id: user.id } }
      });
      return mutationSuccess(201, 'Profile field created successfully!', {
        profileField
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async createProfileFields(_, { data }, { dataSources: { prisma }, user }) {
    if (!Array.isArray(data))
      throw new UserInputError(`Expected data array, got ${typeof data}`);
    try {
      const profileFields = [];
      for (const mutation of data) {
        const profileField = await prisma.createProfileField({
          ...mutation,
          user: { connect: { id: user.id } }
        });
        profileFields.push(profileField);
      }
      return mutationSuccess(201, 'Profile fields created successfully!', {
        profileFields
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async updateProfileField(_, { id, data }, { dataSources: { prisma }, user }) {
    try {
      const fieldExists = prisma.$exists.profileField({
        id,
        user: { id: user.id }
      });
      if (fieldExists) {
        const profileField = await prisma.updateProfileField({
          data,
          where: { id }
        });
        return mutationSuccess(200, 'Profile field updated successfully!', {
          profileField
        });
      } else {
        throw new AuthenticationError('You lack ownership of this field.');
      }
    } catch (error) {
      return mutationError(error);
    }
  },
  async updateProfileFields(_, { data }, { dataSources: { prisma }, user }) {
    if (!Array.isArray(data))
      throw new UserInputError(`Expected data array, got ${typeof data}`);
    try {
      const profileFields = [];
      for (const mutation of data) {
        const { id, ...changes } = mutation;
        const fieldExists = prisma.$exists.profileField({
          id,
          user: { id: user.id }
        });
        if (fieldExists) {
          const profileField = await prisma.updateProfileField({
            data: changes,
            where: { id }
          });
          profileFields.push(profileField);
        } else {
          throw new AuthenticationError('You lack ownership of this field.');
        }
      }
      return mutationSuccess(200, 'Profile fields updated successfully!', {
        profileFields
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async deleteProfileField(_, { id }, { dataSources: { prisma }, user }) {
    try {
      const fieldExists = await prisma.$exists.profileField({
        id,
        user: { id: user.id }
      });

      if (!fieldExists) throw new AuthenticationError('Nice try, mister.');

      const profileField = await prisma.deleteProfileField({ id });
      return mutationSuccess(204, 'User field deleted successfully.', {
        profileField
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async deleteProfileFields(_, { ids }, { dataSources: { prisma }, user }) {
    if (!Array.isArray(ids))
      throw new UserInputError(`Expected ids array, got ${typeof data}`);
    try {
      const profileFields = [];
      for (const id of ids) {
        const fieldExists = await prisma.$exists.profileField({
          id,
          user: { id: user.id }
        });

        if (!fieldExists) throw new AuthenticationError('Nice try, mister.');

        const profileField = await prisma.deleteProfileField({ id });
        profileFields.push(profileField);
      }
      return mutationSuccess(204, 'User fields deleted successfully.', {
        profileFields
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async createQRCode(_, { label }, { dataSources: { prisma }, user }) {
    try {
      const qrcode = await prisma.createQRCode({
        label,
        user: { connect: { id: user.id } }
      });
      return mutationSuccess(201, 'QRCode created successfully!', { qrcode });
    } catch (error) {
      return mutationError(error);
    }
  },
  async createConnection(_, { userID }, { dataSources: { prisma }, user }) {
    try {
      // users should not be able to send a connection to themself
      if (userID === user.id)
        throw new UserInputError(
          "You'll always have a friend in yourself... just not on here."
        );
      // users should not be able to send a duplicate connection
      const existingConnections = await prisma.connections({
        where: {
          OR: [
            { sender: { id: user.id }, receiver: { id: userID } },
            { sender: { id: userID }, receiver: { id: user.id } }
          ]
        }
      });
      if (existingConnections.length) throw new UserInputError(
        'A connection already exists between you.'
      );
      const connection = await prisma.createConnection({
        sender: { connect: { id: user.id } },
        receiver: { connect: { id: userID } }
      });
      return mutationSuccess(201, 'Connection created successfully!', {
        connection
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async updateConnection(_, { id, status }, { dataSources: { prisma }, user }) {
    try {
      const receiver = await prisma.connection({ id }).receiver();
      if (user.id !== receiver.id)
        throw new AuthenticationError(
          'You cannot change a connection that does not belong to you.'
        );
      const connection = await prisma.updateConnection({
        where: { id },
        data: { status }
      });
      return mutationSuccess(200, 'Connection status updated successfully.', {
        connection
      });
    } catch (error) {
      return mutationError(error);
    }
  },
  async deleteConnection(_, { id }, { dataSources: { prisma }, user }) {
    try {
      const sender = await prisma.connection({ id }).sender();
      const receiver = await prisma.connection({ id }).receiver();
      if (![sender.id, receiver.id].includes(user.id))
        throw new AuthenticationError(
          'You cannot delete a connection that does not belong to you.'
        );
      const connection = await prisma.deleteConnection({ id });
      return mutationSuccess(204, 'Connection deleted successfully.', {
        connection
      });
    } catch (error) {
      return mutationError(error);
    }
  }
};

module.exports = Mutation;
