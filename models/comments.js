const { Schema, model } = require("mongoose")

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    postId: String
})

module.exports = model('Comment', commentSchema);