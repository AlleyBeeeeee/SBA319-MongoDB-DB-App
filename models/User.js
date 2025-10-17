import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    bio: {
        type: String,
        maxLength: 100,
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ]
});

export default mongoose.model('user', userSchema)