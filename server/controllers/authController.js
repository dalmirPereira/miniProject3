//Services to access DB
const { findUser, updateUser } = require('../services/userService')

//require for password crypt
const bcrypt = require('bcrypt');

//require for token
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    //get user and password form client
    const { identifier, password } = req.body;

    //check if they existe
    if (!identifier || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    //find the user in our db:
    let info = {};  
   
    if (identifier.includes("@")) {
        info = { email: identifier };
    } else {
        info = { username: identifier };
    }

    //console.log("info: ", info)

    const foundUser = await findUser(info);  
    
    //if username exists
    if (!foundUser) return res.status(401).json({ message: 'Invalid username or email.' }); 
    //if user name found then compare the password 
    const match = await bcrypt.compare(password, foundUser.password);

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
        foundUser.refreshToken = refreshToken;
        const result = await updateUser(foundUser)
        console.log(result);

        // Why use cookies to send the refresh token?
        // Storing the refresh token in an httpOnly cookie protects it from being accessed or manipulated by JavaScript in the browser, 
        // mitigating risks such as cross-site scripting (XSS) attacks. It also allows automatic inclusion in requests to the backend 
        // for token refresh operations without exposing it to the client-side code.
        res.cookie('jwt', refreshToken, { 
            httpOnly: true,       // Cookie not accessible via JavaScript (protects against XSS attacks)
            sameSite: 'None',     // Allow the cookie to be sent with cross-site requests (necessary for frontend and backend on different origins)
            secure: true,         // Send cookie only over HTTPS connections (important for security in production)
            // sameSite: 'Strict', // Alternative: restrict cookie to same-site requests only (more secure, but may break cross-origin use cases)
            // secure: false,      // For local development without HTTPS (only use when testing locally)
            maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time (1 day in milliseconds)
        });
        res.json({ accessToken });
        
    } else {
        res.status(401).json({ message: 'Invalid Password.' });
    }
}

module.exports = { handleLogin };