const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username:  { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        userImage: { type: String },
        myAgendas: [{ type: Schema.Types.ObjectId, ref: 'Agenda' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        followedAgendas: [{ type: Schema.Types.ObjectId, ref: 'Agenda' }]
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("User", userSchema)