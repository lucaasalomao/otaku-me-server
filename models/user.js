import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username:  { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        userImage: { type: Image },
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("User", userSchema)