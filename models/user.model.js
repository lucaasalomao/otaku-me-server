const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    image: { type: String },
    agendas: [{ type: Schema.Types.ObjectId, ref: 'Agenda' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
