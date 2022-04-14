const mongoose = require('mongoose')
const { Schema } = mongoose;

const agendaSchema = new Schema(
    {
        agendaCreator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        agendaName: { type: String, required: true },
        agendaPermission: { type: String, required: true },
        agendaEventTypes:  [{ type: String, required: true }],
        agendaEvents: [{ type: Schema.Types.ObjectId, ref: 'Event', required: true }],
        agendaImage: { type: String },
        agendaOccurence: { type: Number, required: true },
        agendaFollowers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("Agenda", agendaSchema)