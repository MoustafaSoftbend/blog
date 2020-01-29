const fs =require ('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotEnv = require('dotenv');

dotEnv.config({path: './config/configenv'});

const User = require('./models/User');


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));


//  Import data
const importData = async () => {
    try {
        await User.create(users);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch(err) {
        console.error(err);
    }
}

//  Delete data
const deletetData = async () => {
    try {
        await User.deleteMany();
        console.log('Data Destroyed...'.green.inverse);
        process.exit();
    } catch(err) {
        console.error(err);
    }
}

if (process.arg[2] === 'i') {
    importData();
}else if (process.arg[2] === 'd') {
    deletetData();
}
 