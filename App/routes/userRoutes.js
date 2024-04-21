const express = require("express");
const { getUser, register, login } = require("../controllers/userControllers");
const router = express.Router();

// Define routes
router.get("/getUsers", getUser); 
router.post("/register", register); 
router.post("/login", login); 

module.exports = router;