const Express = require('express');
const fileUpload = require('express-fileupload')
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const path = require('path')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const user = require('./routers/user');
const posts = require('./routers/posts');
const auth = require('./routers/auth');
const comments = require('./routers/comments');

// Connect Database
connectDB();

const app = Express();

// Body parser
app.use(Express.json());

// File upload
app.use(fileUpload());

//  Cookie parser
app.use(cookieParser());

// Mongo Sanitizer
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Set xss Cleaner
app.use(xss());

// Rate" Limitting
const limiter = rateLimit({
    windowMs: 10* 60*1000,
    max: 100
})

app.use(limiter);

//Prevent http param polution
app.use(hpp());

// Add static files
app.use('/static', Express.static(path.join(__dirname, 'public')));

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
app.use(errorHandler);

const port = process.env.PORT || 5000

const server = app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow) );

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //Shut down the server
    server.close(() => process.exit(1));
});