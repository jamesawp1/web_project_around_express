const mongoose = require("mongoose");
const { urlRegex } = require("../utils/utils");

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
        return urlRegex.test(v);
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
