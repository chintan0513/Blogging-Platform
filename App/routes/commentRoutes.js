const express = require("express");
const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentControllers");
const { authenticate } = require("../middlewares/authenticate"); 

const router = express.Router();

//define routes for comments
router.post("/create", authenticate, createComment); 
router.get("/get/:commentId", authenticate, getComment); 
router.patch("/update/:commentId", authenticate, updateComment); 
router.delete("/delete/:commentId", authenticate, deleteComment); 

module.exports = router;