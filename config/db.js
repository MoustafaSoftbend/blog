const mongoose = require('mongoose');


const connectDB = async () => {

    const conn = await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    conn.connection.on("error", () => {
        console.log("> error occurred from the database");
    });
    conn.connection.once("open", () => {
        console.log("> successfully opened the database");
    });

    console.log(`MongoDB connected at: ${conn.connection.host} `.red.underline.bold);
}

module.exports = connectDB;