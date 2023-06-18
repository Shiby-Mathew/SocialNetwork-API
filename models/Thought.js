const moment = require("moment");
const { Schema, model } = require("mongoose");

const reactionSchema = require("./Reaction");

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        moment(createdAtDate).format("MMM DD, YYYY [at] hh:mm a"),
      //getter method to format date**********todo
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
