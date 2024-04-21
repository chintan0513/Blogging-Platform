const { BlogPost } = require("../models/blogpost");
const { Comment } = require("../models/comment");
const { User } = require("../models/user");

//to create new post
const createBlog = (req, res, next) => {
  const { title, content, author, categories } = req.body;
  const newBlogPost = new BlogPost({ title, content, author, categories });

  //to check if user exists or not
  User.findById(author).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "User is not registered." });
    }

    //to create new post
    newBlogPost
      .save()
      .then((blogPost) => res.status(200).json(blogPost))
      .catch((err) =>
        res.status(400).json({ error: "There is an error to create post." })
      );
  });
};

//to get post by id
const getBlog = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .populate("author", ["username", "email"])
    .lean()
    .then((blogPost) => {
      if (!blogPost) {
        return res.status(404).json({ error: "Post is not found." });
      }
      Comment.find({ blogpost: blogPost._id })
        .lean()
        .then((comments) => {
          if (comments.length) {
            return res.status(200).json({
              blogpost: {
                ...blogPost,
                comments,
              },
            });
          } else {
            return res.status(200).json({
              blogPost,
            });
          }
        })
        .catch((err) =>
          res.status(500).json({ message: "There is an error. Try again later!" })
        );
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "There is an error. Try again later!" });
    });
};

//to get all posts
const getAllBlog = (req, res, next) => {
  const query = req.query;
  BlogPost.find(query)
    .populate("author", ["username", "email"])
    .lean()
    .then((blogPost) => {
      if (!blogPost.length) {
        return res.status(404).json({ error: "Post is not found!" });
      }
      const blogPostsWithComments = blogPost.map(async (b) => {
        let newObj;
        const withComments = await Comment.find({ blogpost: b._id }).lean();
        if (withComments) {
          if (withComments.length) {
            newObj = {
              ...b,
              comments: withComments,
            };
          } else {
            newObj = b;
          }
        }
        return newObj;
      });
      return Promise.all(blogPostsWithComments)
        .then((blogposts) => res.status(200).json({ blogPosts: blogposts }))
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .json({ error: "There is an error. Try again later!" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "There is an error. Try again later!" });
    });
};

//to update a post by id
const updateBlog = (req, res, next) => {
  const postId = req.params.postId;
  const update = req.body;

  BlogPost.findByIdAndUpdate(postId, update, { new: true })
    .then((blogPost) => {
      if (!blogPost) {
        return res.status(404).json({ error: "Post is not found!" });
      }
      res.status(200).json(blogPost);
    })
    .catch((err) => {
      res.status(500).json({ error: "There is an error. Try again later!" });
    });
};

//to delete a post by id
const deleteBlog = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findByIdAndRemove(postId)
    .then((blogPost) => {
      if (!blogPost) {
        return res.status(404).json({ error: "Post is not found!" });
      }
      return res.json({ message: "Post is deleted!" });
    })
    .catch((err) =>
      res.status(500).json({ error: "There is an error. Try again later!" })
    );
};

exports.createBlog = createBlog;
exports.getBlog = getBlog;
exports.getAllBlog = getAllBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
