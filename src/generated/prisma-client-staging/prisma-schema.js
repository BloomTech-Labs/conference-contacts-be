module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateProfileField {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createProfileField(data: ProfileFieldCreateInput!): ProfileField!
  updateProfileField(data: ProfileFieldUpdateInput!, where: ProfileFieldWhereUniqueInput!): ProfileField
  updateManyProfileFields(data: ProfileFieldUpdateManyMutationInput!, where: ProfileFieldWhereInput): BatchPayload!
  upsertProfileField(where: ProfileFieldWhereUniqueInput!, create: ProfileFieldCreateInput!, update: ProfileFieldUpdateInput!): ProfileField!
  deleteProfileField(where: ProfileFieldWhereUniqueInput!): ProfileField
  deleteManyProfileFields(where: ProfileFieldWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type ProfileField {
  id: ID!
  user: User!
  value: String!
  type: ProfileFieldType!
  privacy: ProfileFieldPrivacy!
}

type ProfileFieldConnection {
  pageInfo: PageInfo!
  edges: [ProfileFieldEdge]!
  aggregate: AggregateProfileField!
}

input ProfileFieldCreateInput {
  id: ID
  user: UserCreateOneWithoutProfileInput!
  value: String!
  type: ProfileFieldType!
  privacy: ProfileFieldPrivacy!
}

input ProfileFieldCreateManyWithoutUserInput {
  create: [ProfileFieldCreateWithoutUserInput!]
  connect: [ProfileFieldWhereUniqueInput!]
}

input ProfileFieldCreateWithoutUserInput {
  id: ID
  value: String!
  type: ProfileFieldType!
  privacy: ProfileFieldPrivacy!
}

type ProfileFieldEdge {
  node: ProfileField!
  cursor: String!
}

enum ProfileFieldOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  type_ASC
  type_DESC
  privacy_ASC
  privacy_DESC
}

type ProfileFieldPreviousValues {
  id: ID!
  value: String!
  type: ProfileFieldType!
  privacy: ProfileFieldPrivacy!
}

enum ProfileFieldPrivacy {
  PUBLIC
  PRIVATE
  CONNECTED
}

input ProfileFieldScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  type: ProfileFieldType
  type_not: ProfileFieldType
  type_in: [ProfileFieldType!]
  type_not_in: [ProfileFieldType!]
  privacy: ProfileFieldPrivacy
  privacy_not: ProfileFieldPrivacy
  privacy_in: [ProfileFieldPrivacy!]
  privacy_not_in: [ProfileFieldPrivacy!]
  AND: [ProfileFieldScalarWhereInput!]
  OR: [ProfileFieldScalarWhereInput!]
  NOT: [ProfileFieldScalarWhereInput!]
}

type ProfileFieldSubscriptionPayload {
  mutation: MutationType!
  node: ProfileField
  updatedFields: [String!]
  previousValues: ProfileFieldPreviousValues
}

input ProfileFieldSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProfileFieldWhereInput
  AND: [ProfileFieldSubscriptionWhereInput!]
  OR: [ProfileFieldSubscriptionWhereInput!]
  NOT: [ProfileFieldSubscriptionWhereInput!]
}

enum ProfileFieldType {
  EMAIL
  PHONE
  SOCIAL
  AGE
  GENDER
  INDUSTRY
  JOBTITLE
  BIO
}

input ProfileFieldUpdateInput {
  user: UserUpdateOneRequiredWithoutProfileInput
  value: String
  type: ProfileFieldType
  privacy: ProfileFieldPrivacy
}

input ProfileFieldUpdateManyDataInput {
  value: String
  type: ProfileFieldType
  privacy: ProfileFieldPrivacy
}

input ProfileFieldUpdateManyMutationInput {
  value: String
  type: ProfileFieldType
  privacy: ProfileFieldPrivacy
}

input ProfileFieldUpdateManyWithoutUserInput {
  create: [ProfileFieldCreateWithoutUserInput!]
  delete: [ProfileFieldWhereUniqueInput!]
  connect: [ProfileFieldWhereUniqueInput!]
  set: [ProfileFieldWhereUniqueInput!]
  disconnect: [ProfileFieldWhereUniqueInput!]
  update: [ProfileFieldUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ProfileFieldUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ProfileFieldScalarWhereInput!]
  updateMany: [ProfileFieldUpdateManyWithWhereNestedInput!]
}

input ProfileFieldUpdateManyWithWhereNestedInput {
  where: ProfileFieldScalarWhereInput!
  data: ProfileFieldUpdateManyDataInput!
}

input ProfileFieldUpdateWithoutUserDataInput {
  value: String
  type: ProfileFieldType
  privacy: ProfileFieldPrivacy
}

input ProfileFieldUpdateWithWhereUniqueWithoutUserInput {
  where: ProfileFieldWhereUniqueInput!
  data: ProfileFieldUpdateWithoutUserDataInput!
}

input ProfileFieldUpsertWithWhereUniqueWithoutUserInput {
  where: ProfileFieldWhereUniqueInput!
  update: ProfileFieldUpdateWithoutUserDataInput!
  create: ProfileFieldCreateWithoutUserInput!
}

input ProfileFieldWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  type: ProfileFieldType
  type_not: ProfileFieldType
  type_in: [ProfileFieldType!]
  type_not_in: [ProfileFieldType!]
  privacy: ProfileFieldPrivacy
  privacy_not: ProfileFieldPrivacy
  privacy_in: [ProfileFieldPrivacy!]
  privacy_not_in: [ProfileFieldPrivacy!]
  AND: [ProfileFieldWhereInput!]
  OR: [ProfileFieldWhereInput!]
  NOT: [ProfileFieldWhereInput!]
}

input ProfileFieldWhereUniqueInput {
  id: ID
}

type Query {
  profileField(where: ProfileFieldWhereUniqueInput!): ProfileField
  profileFields(where: ProfileFieldWhereInput, orderBy: ProfileFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ProfileField]!
  profileFieldsConnection(where: ProfileFieldWhereInput, orderBy: ProfileFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProfileFieldConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  profileField(where: ProfileFieldSubscriptionWhereInput): ProfileFieldSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  authId: String!
  profile(where: ProfileFieldWhereInput, orderBy: ProfileFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ProfileField!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  authId: String!
  profile: ProfileFieldCreateManyWithoutUserInput
}

input UserCreateOneWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutProfileInput {
  id: ID
  authId: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  authId_ASC
  authId_DESC
}

type UserPreviousValues {
  id: ID!
  authId: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  authId: String
  profile: ProfileFieldUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  authId: String
}

input UserUpdateOneRequiredWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  update: UserUpdateWithoutProfileDataInput
  upsert: UserUpsertWithoutProfileInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutProfileDataInput {
  authId: String
}

input UserUpsertWithoutProfileInput {
  update: UserUpdateWithoutProfileDataInput!
  create: UserCreateWithoutProfileInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  authId: String
  authId_not: String
  authId_in: [String!]
  authId_not_in: [String!]
  authId_lt: String
  authId_lte: String
  authId_gt: String
  authId_gte: String
  authId_contains: String
  authId_not_contains: String
  authId_starts_with: String
  authId_not_starts_with: String
  authId_ends_with: String
  authId_not_ends_with: String
  profile_every: ProfileFieldWhereInput
  profile_some: ProfileFieldWhereInput
  profile_none: ProfileFieldWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  authId: String
}
`
      }
    