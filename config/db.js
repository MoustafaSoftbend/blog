// const mongoose = require('mongoose');

// const connectDB = async () => {

//     const conn = await mongoose.connect(process.env.DB_URI, {
//         useNewUrlParser:true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });

//     console.log(`MongoDB connected at: ${conn.connection.host} `.red.underline.bold);
// }

// module.exports = connectDB;

const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({ region: process.env.AWS_REGION });

const docClient = new AWS.DynamoDB.DocumentClient();

const logRequestMiddleware = async (req, res, next) => {
  const logItem = {
    TableName: "your-log-table-name",
    Item: {
      id: new Date().toISOString(),
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    },
  };

  try {
    await docClient.put(logItem).promise();
    console.log("Request logged successfully");
  } catch (error) {
    console.error("Error logging request:", error);
  }

  next();
};

module.exports = logRequestMiddleware;
