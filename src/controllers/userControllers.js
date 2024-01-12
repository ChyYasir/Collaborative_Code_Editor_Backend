import bcrypt from "bcrypt"; // Import the bcrypt library

import User from "../models/userModel.js";

export const userRegister = async (req, res) => {
  try {
    console.log(req.body);
    const { name, username, email, password } = req.body;
    console.log({ name, username, email, password });
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({
      user: user,
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (!user.password) {
      return res.status(500).json({ error: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    res
      .status(200)
      .json({ user: user, message: "Logged in successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const addRoomToUser = async (req, res) => {
  const { userId, roomId } = req.body;

  if (!userId || !roomId) {
    return res.status(400).json({ error: "User ID and Room ID are required" });
  }

  try {
    // Add roomId to the user's roomIds array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if roomId already exists for the user
    if (user.roomIds.includes(roomId)) {
      return res
        .status(200)
        .json({ message: `Room ${roomId} Joined`, success: true });
    }

    user.roomIds.push(roomId);
    await user.save();

    res.status(200).json({
      message: "Room added to user successfully",
      user,
      success: true,
      new: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
