import express from "express";
import {
  saveRoomCode,
  getRoomCode,
  saveChatMessage,
  getChatMessages,
} from "../controllers/roomControllers.js";

const router = express.Router();

router.post("/save-code", saveRoomCode);
router.get("/get-code/:roomId", getRoomCode);
router.post("/save-chat-message", saveChatMessage);
router.get("/get-chat-messages/:roomId", getChatMessages);

export default router;
