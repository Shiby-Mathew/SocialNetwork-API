const { User, Thought } = require("../models");

module.experts = {
  getUsers(eq, res) {
    User.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
};
