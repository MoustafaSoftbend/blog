const Express = require('express');
const dotEnv = require('dotenv').config({ path: './config/config.env' });
const morgan = require('morgan');
const colors = require('colors')
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = Express();

// Body parser
app.use(Express.json())


// Plug Morgan middleware
if(process.env.NODE_ENV == 'development'){
    app.use(morgan);
}

const port = process.env.PORT

app.listen(port, () =>{
    if (process.env.NODE_ENV == 'developement'){
        console.log(`Development server started on port ${port}`.yellow);
    }else {
        console.log(`Production server started on port ${port}`.yellow);
    } 
});