const Express = require('express');
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

const user = require('./routers/user');
const posts = require('./routers/posts');
const auth = require('./routers/auth');
const comments = require('./routers/comments')

// Connect Database
connectDB();

const app = Express();

// Body parser
app.use(Express.json())

//  Cookie parser
app.use(cookieParser());


// Plug Morgan middleware
if(process.env.NODE_ENV == 'development'){
    app.use(morgan);
}

// Plug in Routes
app.use('/api/v1/auth/users', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/posts', posts);
app.use('/api/v1/comments', comments);

// Plug Error handler
app.use(errorHandler)

const port = process.env.PORT || 5000

const server = app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow) );

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //Shut down the server
    server.close(() => process.exit(1));
});