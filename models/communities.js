const { Schema, model } = require("mongoose")

const communitySchema = new Schema({
    title: String,
    content: String,
    picture: String,
    like: Number,
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = model('Community', communitySchema);