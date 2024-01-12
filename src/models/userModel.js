import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: { type: String, unique: true },
  password: String, // Hashed password
  roomIds: [{ type: String }],
});

const User = mongoose.model("User", userSchema);
export default User;
