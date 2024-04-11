import mongoose from "mongoose"

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
    },
    descr: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },

    images: [Array],

    likes: [String],

    favourites: [String],

    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const model = new mongoose.model('items', Schema)

export default model