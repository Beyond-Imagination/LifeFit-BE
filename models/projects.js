const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  }, // 좋아요 누른 사용자 ID 배열
  content: { type: String, required: true },
  imageList: [{ type: String }],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };
