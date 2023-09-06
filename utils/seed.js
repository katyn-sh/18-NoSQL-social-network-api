const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Users
  await User.deleteMany({});

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Thoughts seed
  const thoughts = [
    {
      thoughtText: "Here's a cool thought...",
      userName: 'Amiko',
    },
    {
      thoughtText: 'Well, nice',
      userName: 'Lucia',
    },
    {
      thoughtText: 'I love to gamble, nice',
      userName: 'Al',
    },
    {
      thoughtText: 'Gamble all day everyday',
      userName: 'Sam',
    },
  ];

  // Add Thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Add Users to the collection and await the results
  await User.collection.insertMany([
    {
      userName: 'Amiko',
      email: 'amiko@gmail.com',
    },
    {
      userName: 'Lucia',
      email: 'lucia@gmail.com',
    },
    {
      userName: 'Sam',
      email: 'sam@gmail.com',
    },
    {
      userName: 'Sarah',
      email: 'Sarah@gmail.com',
    },
    {
      userName: 'Dre',
      email: 'dre@gmail.com',
    },
    {
      userName: 'Al',
      email: 'al@gmail.com',
    },
  ]);

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Added Seeds!');
  process.exit(0);
});
