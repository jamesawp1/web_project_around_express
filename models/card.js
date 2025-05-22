const mongoose = require("mongoose");

const regex = {
  user: /https?:\/\/(www\.)?[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}\/?([^\s]*)\/?/gm,
};

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.user.test(v);
      },
      message: "É necessário um link válido.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
