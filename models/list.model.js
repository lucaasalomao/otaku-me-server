const mongoose = require('mongoose')
const { Schema } = mongoose

const listSchema = new Schema(
  {
    listCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listName: { type: String, required: true },
    listDescription: { type: String },
    listImage: { type: String },
    listComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    listItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    listItemTypes: [{ type: String }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('List', listSchema)
