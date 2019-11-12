const Query = {
  
  // Users
  users(parent, args, { prisma }, info) {
    return prisma.users();
  },

  // User
  user(parent, { email }, { prisma }, info) {
    return prisma.user({ email });
  },

  // Manual Contact
  ManualContact(parent, args, { prisma }, info){
    return prisma.ManualContact();
  },

  // Profile Field
  ProfileField(parent, args, { prisma }, info){
    return prisma.ProfileField();
  },

  // Connection
  UsersConnection(parent, { id }, { prisma }, info){
    return prisma.UsersConnection({ id });
  },

  // Conferences
  conferences(parent, { id }, { prisma }, info){
    return prisma.conferences({ id });
  },

  // Conference
  conference(parent, { id }, { prisma }, info){
    return prisma.conference({ id });
  },

  // Coordinate
  Coordinate(parent, args, { prisma }, info){
    return primsa.Coordinate();
  },

  // Connection Status
  ConnectionStatus(parent, args, { prisma }, info){
    return prisma.ConnectionStatus()
  },

  // Info
  Info(parent, args, { prisma }, info){
    return prisma.Info()
  },

  // Privacy 
  Privacy(parent, args, { prisma }, info){
    return prisma.Privacy()
  }
};

module.exports = Query;
