//Services to access DB
const { findUser } = require('../services/userService')

//require for token
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    //check for cookies
    const cookies = req.cookies;
    console.log("cookies", cookies);
    //check if the cookies existe
    if (!cookies?.jwt) return res.sendStatus(401);
    
    //if existes define as refreshToken
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    
    //find the user in our db:
    info = { refreshToken };
    const foundUser = await findUser(info);
    
    //if unauthorize
    if (!foundUser) return res.sendStatus(403); //forbidden
    //if user name found then compare the password 

    try {
        const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(refreshToken)
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
    } catch (err) {
        return res.sendStatus(403); //invalid token
    }
}

module.exports = { handleRefreshToken };