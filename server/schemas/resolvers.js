const { Category, User, Song, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
      categories: async () => {
      return await Category.find();
    },
    songs: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Song.find(params).populate('category');
    },
    song: async (parent, { _id }) => {
      return await Song.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.songs',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async(parent, { _id }, context) => {
      if(context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.songs',
          populate: 'category'
        });
        return user.orders.id(_id);
      }
      throw new AuthenticationError('Not logged in');
    },

    checkout: async (parent, args, context) => {
      //const url = new URL(context.headers.referer).origin;
      const order = new Order({ songs: args.songs });
        const { songs } = await order.populate('songs');
      const line_items = [];

      for (let i = 0; i < songs.length; i++) {
        // Create a new product object for the song
        const product = await stripe.products.create({
          name: songs[i].name,
        });
      
        // Create a new price object for the product
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: songs[i].price * 100,
          currency: 'usd',
        });
      
        // Add the product to the list of line items
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.HOST}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.HOST}/`
      });
      
      return { session: session.id };
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
    addOrder: async(parent, { songs }, context) => {
      console.log(context);
      if(context.user) {
        const order = new Order({ songs });
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order }});
        return order;
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
  }
};

module.exports = resolvers;