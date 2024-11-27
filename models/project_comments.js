const mongoose = require("mongoose");

const projectCommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const ProjectComment = mongoose.model("ProjectComment", projectCommentSchema);

module.exports = { ProjectComment };
