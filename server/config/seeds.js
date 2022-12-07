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
  ]);

  console.log('categories seeded');

  await Song.deleteMany();

  const songs = await Song.insertMany([
    {
      name: 'say so',
      category: categories[0]._id,
      price: 1.99
    },
    {
      name: 'say so 2',
      category: categories[1]._id,
      price: 2.99
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

  console.log('users seeded');

  process.exit();
});
