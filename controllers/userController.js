const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  //Get a single user by :id*************
  getSingleUser(req, res) {
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
  },

  //Create a user **************how to add friends
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
};


//Remove a user's associated thoughts when deleted.
///api/users/:userId/friends/:friendId
//POST/DELETE
