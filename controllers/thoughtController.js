const { Thought, User } = require("../models");

module.experts = {
  getThoughts(eq, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  createThought(req, res) {
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
          return res
            .status(404)
            .json({
              message: "Thought has been created, but no user with this Id",
            });
        }
        res.json({ message: "Thought has been created" });
      })
      .catch((err) => res.status(500).json(err));
  },

  //Get a single thought by :id
  getSingleThought(req, res) {
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
  },
};
