const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    yearPublished: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        required: true,
        enum: [
            "Fiction", "Non-fiction", "Science Fiction", "Fantasy",
            "Romance", "Mystery", "Thriller", "Horror", "Historical",
            "Biography", "Self-Help", "Science", "Technology", "Business",
            "Education", "Health & Wellness", "Travel", "Art & Photography",
            "Children", "Young Adult", "Comics/Graphic Novels"
        ]
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);