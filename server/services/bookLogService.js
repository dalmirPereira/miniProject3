//Requiring schema for MongoDB
const BookLog = require('../model/BookLog');
const Book = require('../model/Book');

const findActiveBookLogByUserId = async (userId) => {
    return await BookLog.find({
        userId: userId,
        returnedAt: null //Filter for not yet returned
    }).exec();
};

const createBookLog = async (userId, bookIds) => {
    const logs = await Promise.all(bookIds.map(async (bookId) => {
        const log = await BookLog.create({ userId, bookId });
        await Book.updateOne(
            { _id: bookId },
            { $set: { available: false } }
        );
        return log;
    }));

    return logs;
};

const getBorrowedBooks = async () => {
    return await BookLog.find();
}

const returnBook = async (userId, bookId) => {

    const returnedBook = await BookLog.updateOne(
            { userId: userId, bookId: bookId, returnedAt: null },
            { $set: { returnedAt: Date.now() } }
    );

    await Book.updateOne(
        { _id: bookId },
        { $set: { available: true } }
    );

    return returnedBook;
}

module.exports = {
    findActiveBookLogByUserId,
    createBookLog,
    getBorrowedBooks,
    returnBook
}