//Requiring schema for MongoDB
const User = require('../model/User');

const findUser = async (info) => {
    return await User.findOne(info).exec();  
};

const updateUser = async (user) => {
    return await user.save();
}

const createUser = async (userData) => {
    return await User.create(userData);
}

module.exports = {
    findUser,
    updateUser,
    createUser
}