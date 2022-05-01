const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    image: { type: String },
    lists: [{ type: Schema.Types.ObjectId, ref: 'Lists' }],
    items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
