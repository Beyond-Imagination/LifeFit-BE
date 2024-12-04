const express = require("express")
const router = express.Router()
const uploadImage = require("../middlewares/uploadImage")
const {
    getCommunityPostsByChunk,
    getCommunityPostsById,
    createPost,
    likePost
} = require("../controllers/communityController")

router.get("/chunk", getCommunityPostsByChunk)
router.get("/:id", getCommunityPostsById)
router.post("/", uploadImage.single("image"), createPost)
router.put("/like", likePost)

module.exports = router