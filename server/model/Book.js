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
    pages: {
        type: Number,
        required: true
    },
    bookCover: {
        type: String,
        required: true,
        trim: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);