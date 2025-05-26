const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}


//require for token
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    //check for cookies
    const cookies = req.cookies;
    
    //check if the cookies existe
    if (!cookies?.jwt) return res.sendStatus(401);
    
    //if existes define as refreshToken
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    
    //find the user in our db:
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    
    //if unauthorize
    if (!foundUser) return res.sendStatus(403); //forbidden
    //if user name found then compare the password 

   jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            //get roles from user object
            const roles = Object.values(foundUser.roles);
            
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles 
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h'}
            );
            res.json({ accessToken })
        }
   )
}

module.exports = { handleRefreshToken };