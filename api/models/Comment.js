// const mongoose = require('mongoose');

// const CommentSchema = mongoose.Schema({
//     content: {
//         type: String,
//         required: [true, 'Please Enter text for comment']
//     },

//     image: {
//         type: String,
//         default: 'default_comment.png'
//     },

//     created_date: {
//         type: Date,
//         default: Date.now
//     },

//     author: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         required: true
//     },

//     post: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'Post',
//         required: true
//     }
// });

// module.exports = mongoose.model('Comments', CommentSchema);
const docClient = require("../config/db");

const { v4: uuidv4 } = require("uuid");

const COMMENTS_TABLE = "Comments";

class Comment {
  constructor(content, image = "default_comment.png", author, post) {
    this.id = uuidv4();
    this.content = content;
    this.image = image;
    this.created_date = new Date().toISOString();
    this.author = author;
    this.post = post;
  }

  async save() {
    const params = {
      TableName: COMMENTS_TABLE,
      Item: { ...this },
    };

    return docClient.put(params).promise();
  }

  static async findById(id) {
    const params = {
      TableName: COMMENTS_TABLE,
      Key: { id: id },
    };

    const result = await docClient.get(params).promise();
    return result.Item;
  }

  static async findByPost(postId) {
    const params = {
      TableName: COMMENTS_TABLE,
      IndexName: "post-index", // Ensure this index exists in DynamoDB
      KeyConditionExpression: "post = :post",
      ExpressionAttributeValues: {
        ":post": postId,
      },
    };

    const result = await docClient.query(params).promise();
    return result.Items;
  }

  static async deleteById(id) {
    const params = {
      TableName: COMMENTS_TABLE,
      Key: { id: id },
    };

    return docClient.delete(params).promise();
  }

  static async updateById(id, updateData) {
    const updateExpressions = [];
    const expressionAttributeValues = {};

    Object.keys(updateData).forEach((key) => {
      updateExpressions.push(`${key} = :${key}`);
      expressionAttributeValues[`:${key}`] = updateData[key];
    });

    const params = {
      TableName: COMMENTS_TABLE,
      Key: { id: id },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW",
    };

    const result = await docClient.update(params).promise();
    return result.Attributes;
  }
}

module.exports = Comment;
