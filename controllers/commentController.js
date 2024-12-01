// const Community = require("../models/communities")
// const Comment = require("../models/comments")
// const User = require("../models/users")
const { commentData } = require('../dummy/dummy')

const getCommentByPostId = async(req, res) => {
    try {
        const { postId } = req.params

        let postComment = []
        commentData.forEach(data => {
            if (data.postId == postId) postComment.push(data)
        });

        res.send(postComment)
    } catch (error) {
        console.log(error)
    }
}

const createComment = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCommentByPostId,
    createComment,
}