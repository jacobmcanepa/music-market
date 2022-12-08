const db = require('./connection');
const { User, Song, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'EDM' },
    { name: 'R&B' },
    { name: 'Rock' },
    { name: 'Pop' },
    { name: 'Hip Hop' },
    { name: 'Classical' },
    { name: 'Country' },
    { name: 'Jazz' },
    { name: 'Soul'}
  ]);

  console.log('categories seeded');

  await Song.deleteMany();

  const songs = await Song.insertMany([
    {
      name: 'Say So',
      category: categories[0]._id,
      price: 0.99
    },
    {
      name: 'Shoot to Thrill',
      category: categories[2]._id,
      price: 0.99
    },
    {
      name: "Let's Stay Together",
      category: categories[8]._id,
      price: 0.99
    },
    {
      name: 'A Change is Gonna Come',
      category: categories[1]._id,
      price: 0.99
    },
    {
      name: 'Boca Raton',
      category: categories[1]._id,
      price: 0.99
    },
    {
      name: 'Fireworks',
      category: categories[3]._id,
      price: 0.99
    },
    {
      name: 'Who Dat Boy',
      category: categories[4]._id,
      price: 0.99
    },
    {
      name: 'RNP',
      category: categories[4]._id,
      price: 0.99
    },
    {
      name: 'I Feel Free',
      category: categories[2]._id,
      price: 0.99
    },
    {
      name: 'Bolero, M. 81',
      category: categories[5]._id,
      price: 0.99
    },
    {
      name: 'Why We Drink',
      category: categories[6]._id,
      price: 0.99
    },
    {
      name: 'Autumn Leaves',
      category: categories[7]._id,
      price: 0.99
    },
  ]);

  console.log('songs seeded');

  await User.deleteMany();

  await User.create({
    displayName: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    artist: false,
    orders: [
      {
        songs: [songs[0]._id, songs[1]._id]
      }
    ]
  });

  await User.create({
    displayName: 'Elijah',
    email: 'eholt@testmail.com',
    password: 'password12345',
    artist: true
  });

  await User.create({
    displayName: 'testuser',
    email: 'test@gmail.com',
    password: 'password',
    artist: false
  });

  console.log('users seeded');

  process.exit();
});
