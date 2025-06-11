//Services to access DB
const { getBooks } = require('../services/bookService')

//---------------------------------BOOK LIST-------------------------------------------------------
const handleBookList = async (req, res) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//--------------------------------------------------------------------------------------------------

module.exports = { 
    handleBookList
 };