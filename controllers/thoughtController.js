const { Thought, User } = require("../models");

module.experts = {
  getThoughts(eq, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
};
