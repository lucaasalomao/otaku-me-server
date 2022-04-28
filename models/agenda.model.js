const mongoose = require('mongoose')
const { Schema } = mongoose

const agendaSchema = new Schema(
  {
    agendaCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    agendaName: { type: String, required: true },
    agendaDescription: { type: String },
    agendaImage: { type: String },
    agendaComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    agendaEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    agendaEventTypes: [{ type: String }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Agenda', agendaSchema)
