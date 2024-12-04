const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentByPostId,
} = require("../controllers/commentController");

router.get("/:postId", getCommentByPostId);
router.post("/", createComment);

module.exports = router;
