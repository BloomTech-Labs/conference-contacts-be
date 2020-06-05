const {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} = require('apollo-server');

// these are here so we follow the response format we defined in our schema
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

  // CREATE USER
  async createUser(_, { data }, { dataSources: { prisma }, decoded }) {
    try {
      const authId = decoded.sub.split('|')[1];
      const userExists = await prisma.$exists.user({ authId });
      // check if user with id already exists in our db
      // if not, create it - otherwise return user data
      if (!userExists) {
        const { email, ...fields } = data;
        const user = await prisma.createUser({ authId, ...fields });
        if (email) {
          await prisma.createProfileField({
            value: email,
            type: 'EMAIL',
            privacy: 'PUBLIC',
            preferredContact: true,
            user: { connect: { authId } }
          });
        }
        return mutationSuccess(201, 'User creation successful!', { user });
      } else {
        const user = await prisma.user({ authId });
        return mutationSuccess(409, 'User already exists.', { user });
      }
    } catch (error) {
      return mutationError(error);
    }
  },

  // UPDATE USER
  async updateUser(_, { data }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
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

  // DELETE USER
  async deleteUser(_, __, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    try {
      const deletedUser = await prisma.deleteUser({ id: user.id });
      return mutationSuccess(204, 'Profile deletion was successful.', { user: deletedUser });
    } catch (error) {
      return mutationError(error);
    }
  },

  // CREATE PROFILE FIELD
  async createProfileField(_, { data }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
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

  // CREATE PROFILE FIELDS
  // the mutation below should be used preferably to the one above
  // so there are less calls to the server in order to update a profile
  async createProfileFields(_, { data }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    if (!Array.isArray(data)) {
      throw new UserInputError(`Expected data array, got ${typeof data}`);
    }
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

  // UPDATE PROFILE FIELD
  async updateProfileField(_, { id, data }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
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

  // UPDATE PROFILE FIELDS
  // same here, the mutation below would be preferable to the one above
  async updateProfileFields(_, { data }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    if (!Array.isArray(data)) {
      throw new UserInputError(`Expected data array, got ${typeof data}`);
    }
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

  // DELETE PROFILE FIELD
  async deleteProfileField(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
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

  // DELETE PROFILE FIELDS
  // same here, the mutation below would be preferable to the one above
  async deleteProfileFields(_, { ids }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    if (!Array.isArray(ids)) {
      throw new UserInputError(`Expected ids array, got ${typeof data}`);
    }
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

  // CREATE QR CODE
  async createQRCode(_, { label }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
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

  // CREATE CONNECTION (THE SENDER)
  async createConnection(_, { userID, senderCoords },{ dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    try {
      // users should not be able to send a connection to themself
      if (userID === user.id) {
        throw new UserInputError(
          "You'll always have a friend in yourself... just not on here."
        );
      }

      // users should not be able to send a duplicate connection
      const existingConnections = await prisma.connections({
        where: {
          OR: [
            { sender: { id: user.id }, receiver: { id: userID } },
            { sender: { id: userID }, receiver: { id: user.id } }
          ]
        }
      });

      if (existingConnections.length) {
        throw new UserInputError('A connection already exists between you.');
      }

      const connection = await prisma.createConnection({
        sender: { connect: { id: user.id } },
        receiver: { connect: { id: userID } },
        senderLat: senderCoords.latitude,
        senderLon: senderCoords.longitude,
      });

      return mutationSuccess(201, 'Connection created successfully!', {
        connection
      });
    } catch (error) {
      return mutationError(error);
    }
  },

  // ACCEPT CONNECTION (THE RECEIVER)
  async acceptConnection(_,{ id, receiverCoords },{ dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    try {
      const receiver = await prisma.connection({ id }).receiver();
      // only receivers of a connection request should be able to accept it
      if (user.id !== receiver.id) {
        throw new ForbiddenError(':( i accept ur frenship even if they wont');
      }

      let connection = await prisma.updateConnection({
        where: { id },
        data: {
          status: 'CONNECTED',
          receiverLat: receiverCoords.latitude,
          receiverLon: receiverCoords.longitude,
        }
      });
      // notify the user who sent the request that it was accepted
      const sender = await prisma.connection({ id }).sender();
      
      // CREATE NOTIFICATION
      await prisma.createNotification({
        message: `You made a friend! ${user.name} has accepted your connection request.`,
        user: { connect: { id: sender.id } }
      });
      // update the location of the connection so users can see where they met
      const { senderLat, senderLon, receiverLat, receiverLon } = connection;
      const distance = Math.sqrt((senderLat - receiverLat) ** 2 + (senderLon - receiverLon) ** 2);
      connection = await prisma.updateConnection({
        where: { id },
        data: { location: distance < 1 ? 'INPERSON' : 'REMOTE',  }
      });
      return mutationSuccess(200, 'Connection status updated successfully.', {
        connection
      });
    } catch (error) {
      return mutationError(error);
    }
  },

  // BLOCK CONNECTION
  // TODO: we haven't really implelmented this client-side, so this could
  // TODO: still be worked on
  async blockConnection(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    try {
      const sender = await prisma.connection({ id }).sender();
      const receiver = await prisma.connection({ id }).receiver();
      if (![sender.id, receiver.id].includes(user.id)) {
        throw new ForbiddenError('What. Is. Happening?!');
      }
      const connection = await prisma.updateConnection({
        where: { id },
        data: { blocker: { connect: { id: user.id } } }
      });
      return mutationSuccess(200, 'User blocked successfully!', {
        connection
      });
    } catch (error) {
      return mutationError(error);
    }
  },

  // DELETE CONNECTION
  async deleteConnection(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    try {
      const sender = await prisma.connection({ id }).sender();
      const receiver = await prisma.connection({ id }).receiver();
      if (![sender.id, receiver.id].includes(user.id)) {
        throw new AuthenticationError(
          "You cannot delete a connection that doesn't belong to you."
        );
      }
      const connection = await prisma.deleteConnection({ id });
      return mutationSuccess(204, 'Connection deleted successfully.', {
        connection
      });
    } catch (error) {
      return mutationError(error);
    }
  },

  // DELETE NOTIFICATION
  async deleteNotification(_, { id }, { dataSources: { prisma }, user }) {
    if (!user) throw new AuthenticationError('User does not exist');
    try {
      const notifiedUser = await prisma.notification({ id }).user();
      if (notifiedUser.id !== user.id) throw new ForbiddenError("That's rude.");
      const notification = await prisma.deleteNotification({ id });
      return mutationSuccess(204, 'Notification dismissed.', { notification });
    } catch (error) {
      return mutationError(error);
    }
  },

  // UPDATE A CONNECTION NOTE
  async updateConnectionNote( _, { id, senderNote, receiverNote }, { dataSources: { prisma }, user }) {
    //check to make sure user can't update note that doesn't belong to them - not functional

    const note = {
      where: { id }
    }
    //if sender, try senderEvent
    if (senderNote) note.data = { senderNote };
    //if receiver, try receiverEvent
    if (receiverNote) note.data = { receiverNote };
  
    try {
      const connection = await prisma.updateConnection(note)
      return mutationSuccess(204, 'Note updated successfully', { connection });
    } catch (error) {
      return mutationError(error);
    }
  },

  // UPDATE A CONNECTION EVENT
  async updateConnectionEvent( _, { id, senderEvent, receiverEvent }, { dataSources: { prisma }, user }) {
    //check to make sure user can't update event that doesn't belong to them -- not functional

    const event = {
        where: { id }
    }
    //if sender, try senderEvent
    if (senderEvent) event.data = { senderEvent };
    //if receiver, try receiverEvent
    if (receiverEvent) event.data = { receiverEvent };

    try {
      const connection = await prisma.updateConnection(event)
      return mutationSuccess(204, 'Event updated successfully', { connection });
    } catch (error) {
      return mutationError(error);
    }
  }
  
};

module.exports = Mutation;
