const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const commentSchema = new Schema({
  user: String,
  body: String,
  postId: ObjectId,
});

module.exports = model("Comment", commentSchema);
