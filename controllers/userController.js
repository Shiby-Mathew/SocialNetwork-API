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

  //Get a single user by :id*************
  // a single user by its _id and populated thought and friend data
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
  //Delete User

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No User find with this ID!" })
          : Thought.deleteMany({ _id: { $in: userData.thoughts } })
      )
      .then(() => res.json({ message: "User and Thought deleted!" }))
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
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

//Remove a user's associated thoughts when deleted.
///api/users/:userId/friends/:friendId
//POST/DELETE

//***************Reactions */
// addVideoResponse(req, res) {
//   Video.findOneAndUpdate(
//     { _id: req.params.videoId },
//     { $addToSet: { responses: req.body } },
//     { runValidators: true, new: true }
//   )
//     .then((video) =>
//       !video
//         ? res.status(404).json({ message: 'No video with this id!' })
//         : res.json(video)
//     )
//     .catch((err) => res.status(500).json(err));
// },
// // Remove video response
// removeVideoResponse(req, res) {
//   Video.findOneAndUpdate(
//     { _id: req.params.videoId },
//     { $pull: { reactions: { responseId: req.params.responseId } } },
//     { runValidators: true, new: true }
//   )
//     .then((video) =>
//       !video
//         ? res.status(404).json({ message: 'No video with this id!' })
//         : res.json(video)
//     )
//     .catch((err) => res.status(500).json(err));
// },
