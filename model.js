const mongoose = require("mongoose");

const empcrud = mongoose.model("empcrud", {
  _id: Number,
  name: String,
  email: String,
  password: String,
});

module.exports = empcrud;
