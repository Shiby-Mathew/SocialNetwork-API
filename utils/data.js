const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
];
const thoughtDescriptions = [
  "Toady rainny day",
  "Today is Monday",
  "Cooking Experiments",
  "New work Place",
  "Deliveries today",
];

const reactionDescriptions = [
  "Toady rainny day",
  "Today is Monday",
  "Cooking Experiments",
  "New work Place",
  "Deliveries today",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactionDescriptions),
      username: getRandomName(),
    });
  }
  return results;
};

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtDescriptions),
      username: getRandomName(),
      reactions: [...getRandomReactions(3)],
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomReactions, getRandomThoughts };
