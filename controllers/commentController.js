const Comment = require("../models/comment")

const createComment = async(req, res) => {
    try {
        const { body, postId } = req.body

        await Comment.create({
            user: "",
            body: body,
            postId: postId
        })

        res.status(201).send("comment created successfully")
    } catch (error) {
        console.log(error)
    }
}

const getCommentByPostId = async(req, res) => {
    try {
        const { postId } = req.params

        const commentByPostId = await Comment.find({ postId: postId })

        res.status(200).send(commentByPostId)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createComment,
    getCommentByPostId
}