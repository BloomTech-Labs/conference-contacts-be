const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    """
    This keeps track of backend versions. The number should be incremented in the resolvers
    file every time a potentially code breaking change is sent to production
    """
    version: Int
    """
    Returns info for the logged in user if no ID is provided, otherwise for a specific user.
    """
    user(id: ID): User
    """
    Returns a specific QR code by its ID.
    """
    qrcode(id: ID!): QRCode
  }
`;

module.exports = typeDefs;
