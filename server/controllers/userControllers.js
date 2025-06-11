//Services to access DB
const { findActiveBookLogByUserId, createBookLog } = require('../services/bookLogService')
const { findBookAvailable } = require('../services/bookService')

//---------------------------------BOOK LOG LIST-------------------------------------------------------
const handleBookLogList = async (req, res) => {
    //get user and password form client
    const { userId } = req.params;
    try {
        const ActiveBookLog = await findActiveBookLogByUserId(userId);
        res.json(ActiveBookLog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//--------------------------------------------------------------------------------------------------

//---------------------------------REGISTER NEW BOOK LOG-------------------------------------------------------
const handleNewBookLog = async (req, res) => {
    //get user and password form client
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: `User ID didn't receive.` }); //Conflict 

    const { bookIds } = req.body;

   // find which fields are missing or empty
    const newBookLog = {
        bookIds
    };

    const missingFields = Object.entries(newBookLog)
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

    // check for duplicate borrowed book in the db
    const userActiveBookLog = await findActiveBookLogByUserId(userId);
    const duplicate = bookIds.some(bookid =>
        userActiveBookLog.some(log => log.bookId === bookid)
    );
    if (duplicate) return res.status(409).json({ message: 'User has at least one active book log matching a bookId in the list.' }); //Conflict 
    
    // check if the books are available db
    const booksAvailable = await findBookAvailable(bookIds);
    if (booksAvailable.length != bookIds.length) return res.status(409).json({ message: 'Some books are not available or do not exist.' }); //Conflict 

    try {
        //create and store the new book log:
        const result = await createBookLog(userId, bookIds);
        
        console.log(result);

        res.status(201).json({ 'success': `Books borrowed successfully!` });
    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
//--------------------------------------------------------------------------------------------------

module.exports = { 
    handleBookLogList,
    handleNewBookLog
 };