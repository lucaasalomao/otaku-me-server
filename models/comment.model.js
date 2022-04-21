const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema(
  {
    commentText: { type: String, required: true, maxLength: 140 },
    commentImage: { type: String },
    commentCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    commentLikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    agendaReference: [{ type: Schema.Types.ObjectId, ref: 'Agenda' }],
    eventReference: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comment', commentSchema)
