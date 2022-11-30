const { Category } = require('../models');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
  },
  Mutation: {
    addCategory: async (parent, args) => {
      const category = await Category.create(args);
      return category;
    },
  }
};

module.exports = resolvers;