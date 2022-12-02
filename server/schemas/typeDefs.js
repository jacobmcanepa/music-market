const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Song {
    _id: ID
    name: String
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    songs: [Song]
  }

  type User {
    _id: ID
    displayName: String
    email: String
    password: String
    artist: Boolean
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    songs(category: ID): [Song]
    song(_id: ID!): Song
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addCategory(name: String!): Category
    addUser(displayName: String!, email: String!, password: String!, artist: Boolean!): Auth
    addOrder(songs: [ID!]): Order
    updateUser(displayName: String, email: String, password: String, artist: Boolean): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;