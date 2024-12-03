const express = require("express");
const router = express.Router();
const {
  getCommunityPostsByChunk,
  getCommunityPostsById,
  createPost,
  likePost,
} = require("../controllers/communityController");

router.get("/chunk", getCommunityPostsByChunk);
router.get("/:id", getCommunityPostsById);
router.post("/", createPost);
router.put("/like", likePost);

module.exports = router;
