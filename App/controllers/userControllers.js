const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../middlewares/authenticate");
const { User } = require("../models/user");

const getUser = (req, res, next) => {
  User.find()
    .then((users) => {
      if (users.length) {
        return res.status(200).json({ users });
      } else {
        return res.status(404).json({ message: "User is not found!" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Something is wrong. Try again later!" })
    );
};

//to register a user
const register = (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      return res
        .status(500)
        .json({ message: "There is an error. Try again later!" });  //if there is a server error
    }
    if (hashedPassword) {
      const newUser = new User({ username, email, password: hashedPassword });

      newUser
        .save()
        .then((user) => {
          if (user) {
            res.status(200).json(user);
          }
        })
        .catch((err) =>
          res.status(500).json({ message: "There is an error. Try again later!" })
        );
    }
  });
};


//to login
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "User is not found!" });  //user is already not registered
      }

      return bcrypt.compare(password, user.password).then((isPassMatched) => {
        if (isPassMatched) {
          console.log(JWT_SECRET_KEY);
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
              email: user.email,
            },
            JWT_SECRET_KEY,
            {
              expiresIn: "1h", // Token expiration time (e.g., 1 hour)
            }
          );
          if (!token)
            return res
              .status(500)
              .json({ error: "There is an error!" });
          return res.json({
            message: "Successful authentication!",
            user: {
              username: user.username,
              email: user.email,
              id: user._id,
            },
            token,
          });
        } else {
          return res
            .status(401)
            .json({ error: "Wrong credentials!" });  //userid or password is wrong
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "There is an error. Try again later!" });  //server error
    });
};

exports.getUser = getUser;
exports.register = register;
exports.login = login;
