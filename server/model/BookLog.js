const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookLogSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    bookId: {
        type: String,
        required: true,
        trim: true
    },
    returnDate: {
        type: Number,
        default: () => Date.now() + 30 * 24 * 60 * 60 * 1000
    },
    returnedAt: {
        type: Number,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('BookLog', bookLogSchema);