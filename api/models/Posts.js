// const mongoose = require('mongoose');

// const PostSchema = new mongoose.Schema({
//     title : {
//         type: String,
//         required: [true, 'Please Enter a name'],
//         unique: true,
//         trim: true,
//         maxlength: [50, 'Name can not ecceed 50 characters']
//     },
//     slug: String,

//     content: {
//         type: String,
//         required: [true, 'Please Enter text content'],
//         unique: true,
//     },

//     image: {
//         type: String,
//         default: 'default_post.png'
//     },

//     category: String,

//     created_date: {
//         type: Date,
//         default: Date.now
//     },

//     author: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User'
//     }
// });

// PostSchema.pre('post', async function(req, res, next) {
//     this.author = req.user._id;
// });

// module.exports = mongoose.model('Post', PostSchema);

const { v4: uuidv4 } = require("uuid");
const docClient = require("../../config/db");

class Posts {
  constructor({
    id,
    title,
    slug,
    content,
    image = "default_post.png",
    category,
    created_date,
    author,
  }) {
    this.id = id || uuidv4();
    this.title = title;
    this.slug = slug;
    this.content = content;
    this.image = image;
    this.category = category;
    this.created_date = created_date || new Date().toISOString();
    this.author = author;
  }

  async save() {
    const params = {
      TableName: "Posts",
      Item: {
        id: this.id,
        title: this.title,
        slug: this.slug,
        content: this.content,
        image: this.image,
        category: this.category,
        created_date: this.created_date,
        author: this.author,
      },
    };

    return docClient.put(params).promise();
  }

  async update() {
    const params = {
      TableName: "Posts",
      Key: { id: this.id },
      UpdateExpression:
        "set title = :title, slug = :slug, content = :content, image = :image, category = :category, author = :author",
      ExpressionAttributeValues: {
        ":title": this.title,
        ":slug": this.slug,
        ":content": this.content,
        ":image": this.image,
        ":category": this.category,
        ":author": this.author,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await docClient.update(params).promise();
    return result.Attributes;
  }

  static async findById(id) {
    const params = {
      TableName: "Posts",
      Key: { id },
    };

    const result = await docClient.get(params).promise();
    return result.Item ? new Post(result.Item) : null;
  }

  static async findByAuthor(author) {
    const params = {
      TableName: "Posts",
      IndexName: "AuthorIndex",
      KeyConditionExpression: "author = :author",
      ExpressionAttributeValues: {
        ":author": author,
      },
    };

    const result = await docClient.query(params).promise();
    return result.Items.map((item) => new Post(item));
  }

  static async deleteById(id) {
    const params = {
      TableName: "Posts",
      Key: { id },
    };

    return docClient.delete(params).promise();
  }
}

module.exports = Posts;
