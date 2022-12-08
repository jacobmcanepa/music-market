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

	type Checkout {
		session: ID
	}

	type Auth {
		token: ID
		user: User
	}

	type Error {
		message: String
	}

	type GetIdsResponse {
		publicIDs: [String]
		error: Error
	}

	type Query {
		categories: [Category]
		songs(category: ID, name: String): [Song]
		song(_id: ID!): Song
		user: User
		order(_id: ID!): Order
		checkout(songs: [ID]!): Checkout
		getIds: [String]
	}

	type Mutation {
		addUser(
			displayName: String!
			email: String!
			password: String!
			artist: Boolean!
		): Auth
		addOrder(songs: [ID]!): Order
		updateUser(
			displayName: String
			email: String
			password: String
			artist: Boolean
		): User
		login(email: String!, password: String!): Auth
		addCategory(name: String!): Category
		addSong(name: String!, price: Float!, category: ID!): Song
		deleteSong(_id: ID!): Song
	}
`;

module.exports = typeDefs;
