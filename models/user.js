const mongoose = require("mongoose");

const regex = {
  avatar: /https?:\/\/(www\.)?[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}\/?([^\s]*)\/?/gm,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.avatar.test(v);
      },
      message: "É necessário um link válido.",
    },
  },
});

module.exports = mongoose.models("user", userSchema);
