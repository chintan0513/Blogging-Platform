const { BlogPost } = require("../models/blogpost");
const { Comment } = require("../models/comment"); 
const { User } = require("../models/user");

//to add comment to a post by id
const createComment = (req, res, next) => {
  const { commenter, text, blogpost } = req.body;
  const newComment = new Comment({ commenter, text, blogpost });
  User.findById(commenter).then((user) => {

    //there is no user
    if (!user) {
      return res.status(401).json({ error: "User is not found!" });
    }
    BlogPost.findById(blogpost).then((foundBlogpost) => {

      //there is no post
      if (!foundBlogpost) {
        return res.status(401).json({ error: "Post is not found!" });
      }
      newComment
        .save()
        .then((comment) => res.status(200).json(comment))
        .catch((err) =>
          res.status(400).json({ error: "There is an error to create post!" })
        );
    });
  });
};

//to get comment of a post by id
const getComment = (req, res, next) => {
  const commentId = req.params.commentId;

  Comment.findById(commentId)
    .populate("commenter", ["username", "email"])
    .populate("blogpost")
    .lean()
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ error: "User is not found!" });
      }
      return res.status(200).json(comment);
    })
    .catch((err) =>
      res.status(500).json({ error: "There is an error. Try again later!" })
    );
};

//to update comment of a post by id
const updateComment = (req, res, next) => {
  const commentId = req.params.commentId;
  const update = req.body;

  Comment.findByIdAndUpdate(commentId, update, { new: true })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ error: "There is no comment!" });
      }
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json({ error: "There is an error. Try again later!" });
    });
};

//to delete comment of a post by id
const deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;

  Comment.findByIdAndRemove(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ error: "There is no comment!" });
      }
      return res.json({ message: "Comment is deleted!" });
    })
    .catch((err) =>
      res.status(500).json({ error: "There is an error. Try again later!" })
    );
};

exports.createComment = createComment;
exports.getComment = getComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
