const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((userData) => {
        //console.log(userData);
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user in this id" })
          : res.status(200).json({ userData })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  //Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id" })
          : Thought.deleteMany({ _id: { $in: userData.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and Thought successfully deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //Update User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  //***************Friend */

  //Add a friend

  addAfriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Remove a friend
  removeAfriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
