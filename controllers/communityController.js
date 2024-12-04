const Community = require("../models/community")
const jwt = require("jsonwebtoken")

const createPost = async(req, res) => {
    try {
        const { title, body } = req.body

        // const token = req.cookies.token
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const url = req.protocol + "://" + req.get("host")

        console.log(title, body, req.file.filename)

        if (title && body) {
            try {
                await Community.create({
                    user: "decodedToken.nickname",
                    title: title,
                    body: body,
                    image: url + "/uploads/community/" + req.file.filename,
                    likes: 0
                })
            } catch(error) {
                console.log(error)
            }

            return res.status(201).send("post is successfully created")
        } else {
            return res.status(400).send("request is inaccurate")
        }
    } catch (error) {
        console.log(error)
    }
}

const getCommunityPostsByChunk = async(req, res) => {
    try {
        const { start, end } = req.query

        console.log(start, end)

        const allPosts = await Community.find({})

        let chunk = []
        for (let i = start; i < end; i++) {
            chunk.push(allPosts[i])
        }

        res.status(200).send(chunk)
    } catch (error) {
        console.log(error)
    }
}

const getCommunityPostsById = async(req, res) => {
    try {
        const { id } = req.params

        const post = await Community.findById(id)

        res.status(200).send(post)
    } catch (error) {
        console.log(error)
    }
}

const likePost = async(req, res) => {
    try {
        const { postId, likes } = req.body

        await Community.findByIdAndUpdate(postId, { likes: likes })
        
        res.status(200).send("likes is successfully reflect on post")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createPost,
    getCommunityPostsByChunk,
    getCommunityPostsById,
    likePost
}