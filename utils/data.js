const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
];
const thoughtDescriptions = [
    'Toady rainny day',
  'Today is Monday',
  'Cooking Experiments',
  'New work Place',
  'Deliveries today',
];


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

  
// Function to generate random assignments that we can add to thoughts object.
const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        assignmentName: getRandomArrItem(thoughtDescriptions),
        score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
      });
    }
    return results;
  };

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };
