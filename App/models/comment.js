const { Schema, default: mongoose } = require("mongoose");
const { BlogPost } = require("./blogpost");
const { User } = require("./user");

//comment, comment reference to postId and creationDate of comment
const commentSchema = new Schema({
  commenter: { type: mongoose.Types.ObjectId, required: true, ref: User }, 
  text: { type: String, required: true }, 
  createdAt: { type: Date, default: new Date() }, 
  blogpost: { type: mongoose.Types.ObjectId, required: true, ref: BlogPost }, 
});

const Comment = mongoose.model("Comment", commentSchema);
exports.Comment = Comment;
