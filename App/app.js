const express = require("express");
const { default: mongoose } = require("mongoose"); 
const bodyParser = require("body-parser"); 
const cors = require("cors"); 

//routes
const userRoutes = require("./routes/userRoutes");
const blogpostRoutes = require("./routes/blogpostRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// route handlers for API 
app.use("/api/user", userRoutes);
app.use("/api/blogpost", blogpostRoutes);
app.use("/api/comment", commentRoutes);

app.use("/", (req, res, next) =>
  res.status(200).json({ message: `Server is running on ${PORT}` })
);

mongoose
  .connect(
    "mongodb+srv://shailyp05:shaily0512@cluster1.nhcyyvf.mongodb.net/AdtAssignment1?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Server is running on ${PORT}`);
    app.listen(PORT); 
  })
  .catch((err) => console.log("There is an error :", err)); 