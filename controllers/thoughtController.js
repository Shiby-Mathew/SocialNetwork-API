const { Thought, User } = require("../models");

function getThoughts(req, res) {
  Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
}

// create a new thought
//to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)*******
function createThought(req, res) {
  Thought.create(req.body)
    .then((thoughtData) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thought: thoughtData._id } },
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
}

//Get a single thought by :id
function getSingleThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thoughtData) =>
      !thoughtData
        ? res.status(404).json({ message: "No Thought exist with that ID" })
        : res.status(200).json({ thoughtData })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

module.exports = { getThoughts, createThought, getSingleThought };

// /api/thoughts/:thoughtId/reactions
// POST/DELETE
