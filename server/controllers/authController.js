const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

//require for password crypt
const bcrypt = require('bcrypt');

//require for token
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises; //not integrated mongol (in case we need to work  with json files) 
const path = require('path');

const handleLogin = async (req, res) => {
    //get user and password form client
    const { user, pwd } = req.body;
    
    //check if they existe
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    //find the user in our db:
    const foundUser = usersDB.users.find(person => person.username === user);
    
    //if unauthorize
    if (!foundUser) return res.sendStatus(401); 
    //if user name found then compare the password 
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        //get the roles into the user object.
        const roles = Object.values(foundUser.roles);

        // create JWTs:
        const payload = { 
            "UserInfo": {
                "username": foundUser.username,
                "roles": roles
            } 
        };

        const secretAccess = process.env.ACCESS_TOKEN_SECRET;
        const expireAccess = {expiresIn: "1h"}
        const accessToken = jwt.sign(payload, secretAccess, expireAccess);

        const secretRefresh = process.env.REFRESH_TOKEN_SECRET;
        const expireRefresh = {expiresIn: "1d"}
        const refreshToken = jwt.sign(payload, secretRefresh, expireRefresh);
        
        //Save the refreshToken in the DB:
        //It creates an array of users that are in the db but are not the ones are requiring access.
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken });
        
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };