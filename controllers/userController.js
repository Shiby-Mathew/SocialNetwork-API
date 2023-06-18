const { User, Thought } = require("../models");

function getUsers(req, res) {
  console.log("hello");
  User.find()
    //.select("-__v")
    .then((userData) => {
      console.log(userData);
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

//Get a single user by :id*************
function getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then((userData) =>
      !userData
        ? res.status(404).json({ message: "No user with that ID" })
        : res.status(200).json({ userData })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

//Create a user **************how to add friends
function createUser(req, res) {
  User.create(req.body)
    .then((userData) => res.json(userData))
    .catch((err) => res.status(500).json(err));
}

//Remove a user's associated thoughts when deleted.
///api/users/:userId/friends/:friendId
//POST/DELETE
module.exports = { getUsers, getSingleUser, createUser };
