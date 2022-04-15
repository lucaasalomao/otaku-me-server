const mongoose = require('mongoose')
const { Schema } = mongoose

const feedbackSchema = new Schema(
  {
    feedbackText: { type: String, required: true, maxLength: 140 },
    feedbackScore: { type: Number }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Feedback', feedbackSchema)
