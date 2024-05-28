const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String,
      },
      votes: [String],
    },
  ],
}, { timestamps: true });

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
