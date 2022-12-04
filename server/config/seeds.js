const db = require('./connection');
const { User, Song, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Pop' },
    { name: 'Rock ' },
    { name: 'Hip-hop' },
    { name: 'Jazz' },
    { name: 'Classical' }
  ]);

  console.log('categories seeded');

  await Song.deleteMany();

  const songs = await Song.insertMany([
    {
      name: 'Say So',
      category: categories[0]._id,
      price: 1.99,
    },
    {
      name: 'Paradise City',
      category: categories[1]._id,
      price: 1.99,
    },
    {
      name: 'Family Ties',
      category: categories[2]._id,
      price: 7.99,
    },
    {
      name: 'The Magnificent 7',
      category: categories[3]._id,
      price: 3.99,
    },
    {
      name: 'Moonlight Sonata',
      category: categories[4]._id,
      price: 14.99,
    }
  ]);

  console.log('songs seeded');

  await User.deleteMany();

  await User.create({
    displayName: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    artist: true,
    orders: [
      {
        songs: [songs[0]._id, songs[1]._id, songs[2]._id]
      }
    ]
  });

  await User.create({
    displayName: 'Elijah',
    email: 'eholt@testmail.com',
    password: 'password12345',
    artist: false,
  });

  console.log('users seeded');

  process.exit();
});
