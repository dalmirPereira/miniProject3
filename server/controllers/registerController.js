const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    //get user and password form client
    const { user, pwd } = req.body;

    //check if they existe
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(pwd, saltRounds);
        
        //store the new user:
        const newUser = { 
            "username": user,
            "roles": {
                "Uuser" : 2001
            },
            "password": hashedPwd 
        };
        //simulating db:
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        
        res.status(201).json({ 'success': `New user ${user} created!` });
    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };