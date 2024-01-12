import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  code: { type: String, default: "" },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
