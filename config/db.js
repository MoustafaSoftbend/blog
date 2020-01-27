const mongoose = require('mongoose');


const connectDB = async () => {

    const conn = await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });


    console.log(`MongoDB connected at: ${conn.connection.host} `.red.underline.bold);
}

module.exports = connectDB;