require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');

//Requires to host validation with cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials')

//Requires to loggers
const { logger } = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');

//Require to refresh
const cookieParser = require('cookie-parser');

//Require to middleware authorizasion
const verifyJWT = require('./middlewares/verifyJWT')

//Require to roles verification
const verifyRoles = require('./middlewares/verifyRoles')
const ROLES_LIST = require('./config/roles_list');

//Require for MongoDB
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

//custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS!
//and fetch cookies credentials requirement
app.use(credentials);
//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware for json (for accessing req.body in routes)
app.use(express.json())

//middleware for cookies for refresh
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/register', require('./routes/registerRoute'));
app.use('/auth', require('./routes/authRoute'));
app.use('/refresh', require('./routes/refreshRoute'));
app.use('/logout', require('./routes/logoutRoute'));

//app.use(verifyJWT);
//app.use('/dashboard', require('./routes/dashboardRoute'));
//app.use('/admin', veryfyRoles(ROLES_LIST.Admin) require('./routes/adminRoute'));

//custom error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    //connect the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})

