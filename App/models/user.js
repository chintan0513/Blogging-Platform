const { Schema, default: mongoose } = require("mongoose");

// username, email, password and creationDate of user when registers
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, lowercase: true, required: true }, 
  password: { type: String, minLength: 6 },
  createdAt: { type: Date, default: new Date() }, 
});

const User = mongoose.model("User", userSchema);
exports.User = User;
