const { Category, User, Song, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
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
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.find({ _id: context.user._id })
          .select('-__v, -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    }
  },
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
  }
};

module.exports = resolvers;