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
  }
};

module.exports = Mutation;
