const express = require('express')
const router = express.Router()
const {
    getCommunityPostByChunk,
    getCommunityPostById,
    createCommunityPost,
    likeCommunityPost,
} = require("../controllers/communityController")

router.get("/chunk", getCommunityPostByChunk)
router.get("/:id", getCommunityPostById)
router.post("/", createCommunityPost)
router.post("/like", likeCommunityPost)

module.exports = router