const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

const createComment = async (req, res) => {
  try {
    const { body, postId } = req.body;
    const token = req.cookies.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    await Comment.create({
      user: decodedToken.nickname,
      body: body,
      postId: postId,
    });

    res.status(201).send("comment created successfully");
  } catch (error) {
    console.log(error);
  }
};

const getCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const commentByPostId = await Comment.find({ postId: postId });

    res.status(200).send(commentByPostId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createComment,
  getCommentByPostId,
};
