const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.username = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles
        
        next();
    }
    catch (err) {
        return res.sendStatus(403); //invalid token
    }
}

module.exports = verifyJWT