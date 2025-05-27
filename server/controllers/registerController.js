//Services to access DB
const { findUser, createUser } = require('../services/userService')

//Require needed for uncrypting the password
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    //get user and password form client
    const { username, firstName, lastName, email, password } = req.body;

   // find which fields are missing or empty
    const requiredFields = {
        username,
        firstName,
        lastName,
        email,
        password    
    };
    
    const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value || value.trim() === '')
        .map(([key]) => key);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `The following fields are required and missing: ${missingFields.join(', ')}`
        });
    }

    // check for duplicate usernames in the db
    const info = { username: username };
    const duplicate = await findUser(info);
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        
        //update password
        requiredFields.password = hashedPwd

        //create and store the new user:
        const result = await createUser(requiredFields);
        
        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!` });
    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };