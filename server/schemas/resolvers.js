const { Category, User, Song, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { uploadFile } = require('../utils/cloudinary');
const { GraphQLUpload } = require('graphql-upload.');

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		categories: async () => {
			return await Category.find();
		},
		songs: async (parent, { category }) => {
			const params = {};

			if (category) {
				params.category = category;
			}

			return await Song.find(params).populate('category');
		},
		song: async (parent, { _id }) => {
			return await Song.findById(_id).populate('category');
		},
		users: async () => {
			return await User.find();
		},
		order: async (parent, { _id }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate({
					path: 'orders.songs',
					populate: 'category',
				});
				return user.orders.id(_id);
			}
			throw new AuthenticationError('Not logged in');
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.find({ _id: context.user._id }).select(
					'-__v, -password'
				);

				return userData;
			}

			throw new AuthenticationError('Not logged in');
		},
	},
	Upload: GraphQLUpload,
	Mutation: {
		addCategory: async (parent, args) => {
			const category = await Category.create(args);
			return category;
		},
		addSong: async (parent, args) => {
			const song = await Song.create(args);
			return song;
		},
		deleteSong: async (parent, { _id }) => {
			const song = await Song.deleteOne({ _id: _id });
			return song;
		},
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect Credentials');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect Credentials');
			}

			const token = signToken(user);
			return { token, user };
		},
		addOrder: async (parent, { songs }, context) => {
			console.log(context);
			if (context.user) {
				const order = new Order({ songs });
				await User.findByIdAndUpdate(context.user._id, {
					$push: { orders: order },
				});
				return order;
			}
		},
		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {
					new: true,
				});
			}

			throw new AuthenticationError('Not logged in');
		},
		uploadAvatar: async (parent, args, context, info) => {
			const file = await uploadFile(args.avatar);
			return saveToDatabase(file.secure_url);
		},
	},
};

module.exports = resolvers;
