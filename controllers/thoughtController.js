const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Gets a single application using the findOneAndUpdate method.
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id" })
          : res.status(200).json({ thoughtData })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new thought

  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({
            message: "Thought has been created, but no user with this Id",
          });
        }
        res.json({ message: "Thought has been created" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message: "Thought deleted but no user with this thought id",
            })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Updates and thought using the findOneAndUpdate method.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(thoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //***************Reaction */

  //Add a reaction for thought
  addThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Remove a reaction for thought
  removeThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
