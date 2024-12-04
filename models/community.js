const { Schema, model } = require("mongoose");

const communitySchema = new Schema({
  user: String,
  title: String,
  body: String,
  image: String,
  likes: Number,
});

module.exports = model("Community", communitySchema);
