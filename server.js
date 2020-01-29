const Express = require('express');
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

const user = require('./routers/user');

// Connect Database
connectDB();

const app = Express();

// Body parser
app.use(Express.json())


// Plug Morgan middleware
if(process.env.NODE_ENV == 'development'){
    app.use(morgan);
}

// Add Users Route
app.use('/api/v1/auth/users', user);

// Plug Error handler
app.use(errorHandler)

const port = process.env.PORT || 5000

const server = app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow) );

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);

    //Shut down the server
    server.close(() => process.exit(1));
});