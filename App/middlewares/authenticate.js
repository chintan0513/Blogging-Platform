const jwt = require("jsonwebtoken");

//sign in key
const JWT_SECRET_KEY = "Shaily110123322ADT";
const authenticate = (req, res, next) => {
  // Retrieve the token from the 'Authorization' header
  let token = req.header("Authorization");
  
  //missing token
  if (!token) {
    return res.status(401).json({ message: "There is no token!" });
  }
  
  token = token.split(" ")[1];
  
  // Verify token
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("There is an error. Token can't be verified!", err);
      return res.status(401).json({ message: "Wrong token!" });
    }    
    req.user = decoded;

    next();
  });
};

module.exports = { authenticate, JWT_SECRET_KEY };
