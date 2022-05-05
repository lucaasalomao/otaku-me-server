const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema(
  {
    itemCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    itemType: { type: String, required: true },
    itemDate: { type: String, required: true },
    itemName: { type: String, required: true },
    itemImage: { type: String },
    itemComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    itemList: { type: Schema.Types.ObjectId, ref: 'List' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', itemSchema)
