const mongoose = require('mongoose')
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        eventCreator: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true,
            unique: true 
        },
        eventFormat:  { type: String, required: true },
        eventDate: { type: String, required: true },
        eventName: { type: String, required: true },
        eventImage: { type: String },
        eventOccurence: { type: Number, required: true },
        eventFollowers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("Event", eventSchema)