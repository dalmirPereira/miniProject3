//Services to access DB
const { findUser, updateUser } = require('../services/userService')


const handleLogout = async (req, res) => {
    //check if the cookies existe
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    
    //if existes define as refreshToken
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    
    //find the user in our db:
    info = { refreshToken };
    const foundUser = await findUser(info);
    
    //if not found
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    
    //Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await updateUser(foundUser)
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true}); //secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };