const verifyRoles = (...allowedRoles) => {
    
    return (req, res, next) => {
        //check if the roles were send.
        if (!req?.roles) return res.sendStatus(401);

        //if yes it will compare the allowedRoles with the requested ones and if matched (true) it will go to next.
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);

        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles