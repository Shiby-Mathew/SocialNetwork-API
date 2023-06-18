const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomName,
  getRandomReactions,
  getRandomThoughts,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [
    {
      username: "abc",
      email: "abc@gmail.com",
      thoughts: [],
      friends: [],
    },
  ];
  const thoughts = getRandomThoughts(2);

  //   for (let i = 0; i < 2; i++) {
  //     const username = getRandomName();
  //     const email = "abc@gmail.com";
  //     const last = fullName.split(" ")[1];

  //     users.push({
  //       first,
  //       last,
  //       age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
  //     });
  //   }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
