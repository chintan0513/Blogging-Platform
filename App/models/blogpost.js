const { Schema, default: mongoose } = require("mongoose");
const { User } = require("./user");

//schema of post
const blogpostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, 
  author: { type: mongoose.Types.ObjectId, required: true, ref: User }, 
  createdAt: { type: Date, default: new Date() }, 
  categories: { type: [{ type: String }] }, 
});

const BlogPost = mongoose.model("BlogPost", blogpostSchema);
exports.BlogPost = BlogPost;
