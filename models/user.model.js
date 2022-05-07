const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, maxLength: 16 },
    passwordHash: { type: String, required: true },
    image: { type: String },
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
