const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema(
  {
    commentText: { type: String, required: true, maxLength: 140 },
    commentCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    commentLikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    itemReference: { type: Schema.Types.ObjectId, ref: 'Item', unique: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comment', commentSchema)
