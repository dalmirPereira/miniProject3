//Requiring schema for MongoDB
const Book = require('../model/Book');

const findBook = async (info) => {
    return await Book.findOne(info).exec();  
};

const updateBookById = async (id, updateData) => {
    return await Book.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,          // Return the updated document
            runValidators: true // Ensure schema validation runs
        }
    ).exec();
};

const createBook = async (book) => {
    return await Book.create(book);
}

const getBooks = async () => {
    return await Book.find();
}

const deleteBookById = async (id) => {
    return await Book.findByIdAndDelete(id).exec();
};

module.exports = {
    findBook,
    updateBookById,
    createBook,
    getBooks,
    deleteBookById
}