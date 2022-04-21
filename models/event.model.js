const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema(
  {
    eventCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    eventType: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventName: { type: String, required: true },
    eventImage: { type: String },
    eventComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Event', eventSchema)
