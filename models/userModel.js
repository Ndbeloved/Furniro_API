import mongoose from "mongoose"

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

    address: {
        type: String
    },

    cart: [String],

    likes: [String],

    joinedAt: {
        type: Date,
        default: Date.now(),
    }
})

const model = new mongoose.model('users', Schema)
export default model