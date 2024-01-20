import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  roomName: String,
  code: { type: String, default: "" },
  chatMessages: [
    {
      username: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
