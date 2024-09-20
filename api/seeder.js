const fs =require ('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotEnv = require('dotenv').config({ path: './config/config.env' });

console.log(process.argv)

const User = require('./models/User');
const Post = require('./models/Posts');
const Comment = require('./models/Comment');


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
const posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`, 'utf-8'));
const comments = JSON.parse(fs.readFileSync(`${__dirname}/data/comments.json`, 'utf-8'));


//  Import data
const importData = async (Model, resource) => {
    try {
        await Model.create(resource);
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

if (process.argv[2] === 'i') {
    switch (process.argv[3]){
        case 'u':
            console.log("....creating users")
            importData(User, users);
            break;
        case 'p':
            importData(Post, posts);
            break;
        case 'c':
            importData(Comment, comments);
            break;

    }
}else if (process.argv[2] === 'd') {
    switch (process.argv[3]){
        case 'u':
            deletetData(User, users);
            break;
        case 'p':
            deletetData(Post, posts);
            break;
        case 'c':
            deletetData(Comment, comments);
            break;
    }
}
 