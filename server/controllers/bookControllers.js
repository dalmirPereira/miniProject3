//Services to access DB
const { findBook, updateBookById, getBooks, createBook, deleteBookById } = require('../services/bookService')

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


//---------------------------------REGISTER NEW BOOK-------------------------------------------------------
const handleNewBook = async (req, res) => {
    //get user and password form client
    const { title, author, description, yearPublished, pages, bookCover } = req.body;

   // find which fields are missing or empty
    const newBook = {
        title,
        author,
        description,
        yearPublished,
        pages, 
        bookCover
    };
    console.log("newBook", newBook);

    const missingFields = Object.entries(newBook)
        .filter(([key, value]) => {
            if (value === undefined || value === null) return true;
            if (typeof value === 'string' && value.trim() === '') return true;
            if (Array.isArray(value) && value.length === 0) return true;
        return false;
        })
        .map(([key]) => key);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `The following fields are required and missing: ${missingFields.join(', ')}`
        });
    }

    // check for duplicate title in the db
    const info = { title: title };
    const duplicate = await findBook(info);
    if (duplicate) return res.status(409).json({ message: 'Book Title already registered. Choose another title.' }); //Conflict 
    try {
        //create and store the new user:
        const result = await createBook(newBook);
        
        console.log(result);

        res.status(201).json({ 'success': `New book ${title} created!` });
    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
//--------------------------------------------------------------------------------------------------


//---------------------------------UPDATE BOOK-------------------------------------------------------
const handleUpdateBook = async (req, res) => {
    //check for missing id
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: `ID didn't received.` }); //Conflict 

    const { title, author, description, yearPublished, pages, bookCover } = req.body;
    const updateData = {
        title,
        author,
        description,
        yearPublished,
        pages, 
        bookCover
    };
    
    //find missing or empty fields
    const missingFields = Object.entries(updateData)
        .filter(([key, value]) => {
            if (value === undefined || value === null) return true;
            if (typeof value === 'string' && value.trim() === '') return true;
            if (Array.isArray(value) && value.length === 0) return true;
        return false;
        })
        .map(([key]) => key);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `The following fields are required and missing: ${missingFields.join(', ')}`
        });
    }

    //update the book in our db:
    try {

        //create and store the new user:
        const updatedBook = await updateBookById(id, updateData);
        console.log(updatedBook);

        if (!updatedBook) {
            return res.status(404).json({ message: `Book with ID ${id} not found.` });
        }

        res.status(201).json({ success: `Book ${updatedBook.title} updated!` });
    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};
//--------------------------------------------------------------------------------------------------

//---------------------------------DELETE BOOK-------------------------------------------------------
const handleDeleteBook = async (req, res) => {
    //check for missing id
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: `Book with ID ${id} not found.` });; //Conflict 

    try {
        const deletedBook = await deleteBookById(id);

        if (!deletedBook) {
            return res.status(404).json({ message: `Book with ID ${id} not found.` });
        }

        res.status(200).json({ success: `Book "${deletedBook.title}" deleted successfully.` });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//--------------------------------------------------------------------------------------------------


module.exports = { 
    handleBookList,
    handleNewBook,
    handleUpdateBook,
    handleDeleteBook
 };