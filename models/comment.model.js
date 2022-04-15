const mongoose = require('mongoose')
const { Schema } = mongoose

/* 22 */

const commentSchema = new Schema(
  {
    commentCreator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    commentText: { type: String, required: true, maxLength: 140 },
    commentImage: { type: String },
    commentLikes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comment', commentSchema)
