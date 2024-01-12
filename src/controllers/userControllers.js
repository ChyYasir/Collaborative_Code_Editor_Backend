import bcrypt from "bcrypt"; // Import the bcrypt library

import User from "../models/userModel.js";
import Room from "../models/roomModel.js";

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
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find or create the room
    let room = await Room.findOne({ roomId });
    if (!room) {
      room = new Room({ roomId });
      await room.save();
    }

    // Check if the room's _id is already in user's roomIds
    if (user.roomIds.includes(room._id)) {
      return res
        .status(200)
        .json({ message: `Room ${roomId} already joined`, success: true });
    }

    // Add the room's _id to user's roomIds
    user.roomIds.push(room._id);
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
export const getUserData = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate({
      path: "roomIds", // This should match the field name in User schema
      model: "Room",
      select: "roomId roomName ", // These should match the field names in Room schema
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserData:", error); // Log the detailed error
    res.status(500).json({ error: error.message });
  }
};
