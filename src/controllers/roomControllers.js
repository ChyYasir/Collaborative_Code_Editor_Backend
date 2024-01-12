import Room from "../models/roomModel.js";

export const saveRoomCode = async (req, res) => {
  const { roomId, code } = req.body;
  console.log({ code });
  try {
    let room = await Room.findOne({ roomId });
    if (room) {
      room.code = code;
    } else {
      room = new Room({ roomId, code });
    }
    await room.save();
    res.status(200).json({ message: "Code saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoomCode = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ roomId });
    res.status(200).json({ code: room ? room.code : "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
