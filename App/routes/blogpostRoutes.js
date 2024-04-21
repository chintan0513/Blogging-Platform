const express = require("express");
const {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
} = require("../controllers/blogpostControllers");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();

//define routes for post
router.post("/create", authenticate, createBlog);
router.get("/get/:postId", authenticate, getBlog);
router.get("/get", authenticate, getAllBlog);
router.patch("/update/:postId", authenticate, updateBlog);
router.delete("/delete/:postId", authenticate, deleteBlog);

module.exports = router;
