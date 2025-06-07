//Requiring schema for MongoDB
const BookLog = require('../model/BookLog');
const Book = require('../model/Book');
const User = require('../model/User');
const { format } = require('date-fns') ;

const findActiveBookLogByUserId = async (userId) => {
    const activeBookLog = await BookLog.find({
        userId: userId,
        returnedAt: null // Filter for not yet returned
    }).exec();

    const bookIds = activeBookLog.map(log => log.bookId);

    const bookTitles = await Book.find({ _id: { $in: bookIds } }).exec();

    // Build a map of bookId => book
    const bookMap = {};
    bookTitles.forEach(book => {
        bookMap[book._id.toString()] = book;
    });

    const completeBookLog = activeBookLog.map(log => {
        const book = bookMap[log.bookId.toString()];
        
        return {
            title: book ? book.title : "Unknown",
            returnDate: format(new Date(log.returnDate), 'dd/MM/yyyy'),
            borrowedDate: format(new Date(log.createdAt), 'dd/MM/yyyy')
        };
    });

    return completeBookLog;
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
    const activeBookLog = await BookLog.find({  returnedAt: null }).exec();

    const userIds = activeBookLog.map(log => log.userId.toString());
    const users = await User.find({ _id: { $in: userIds } }).exec();

    const bookIds = activeBookLog.map(log => log.bookId.toString());
    const bookTitles = await Book.find({ _id: { $in: bookIds } }).exec();

    // Map books by ID for fast lookup
    const bookMap = {};
    bookTitles.forEach(book => {
        bookMap[book._id.toString()] = book;
    });

    // Group logs by userId
    const logsByUser = {};
    activeBookLog.forEach(log => {
        const uid = log.userId.toString();
        if (!logsByUser[uid]) {
            logsByUser[uid] = [];
        }
        logsByUser[uid].push(log);
    });

    const completeBookLog = users.map(user => {
        const userLogs = logsByUser[user._id.toString()] || [];

        return {
            userId: user._id,
            username: user.username,
            books: userLogs.map(log => {
                const book = bookMap[log.bookId.toString()];
                return {
                    bookId: log.bookId,
                    title: book ? book.title : "Unknown",
                    returnDate: log.returnDate ? format(new Date(log.returnDate), 'dd/MM/yyyy') : null,
                    borrowedDate: format(new Date(log.createdAt), 'dd/MM/yyyy')
                };
            })
        };
    });

    return completeBookLog;
};

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