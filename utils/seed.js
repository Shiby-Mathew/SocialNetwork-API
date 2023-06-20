const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});
  const users = [];

  const thoughts = getRandomThoughts(3);

  const emails = [
    "abcd@gmail.com",
    "1234@gmail.com",
    "newemail@none.com",
    "email@gmail.com",
  ];

  for (let i = 0; i < emails.length; i++) {
    const username = getRandomName();
    const email = emails[i];
    const thoughts = [];
    const friends = [];

    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
