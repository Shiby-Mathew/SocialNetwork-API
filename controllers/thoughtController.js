const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //Get a single thought by :id

  // Gets a single application using the findOneAndUpdate method. We pass in the ID of the application and then respond with it, or an error if not found
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
  //to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)*******

  // Creates a new thought. Accepts a request body with the entire thought object.
  // Because thought are associated with Users, we then update the User who created the thought and add the ID of the thought to the thought array
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

  // Delete thought

  // Deletes thought from the database. Looks for thought by ID.
  // Then if the thought exists, we look for any users associated with the thought based on thoughtID and update tthe hought array for the User.
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

  //Update Thought

  // Updates and thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
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

  // /api/thoughts/:thoughtId/reactions
  // POST/DELETE

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
