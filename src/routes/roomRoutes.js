import express from "express";
import { saveRoomCode, getRoomCode } from "../controllers/roomControllers.js";

const router = express.Router();

router.post("/save-code", saveRoomCode);
router.get("/get-code/:roomId", getRoomCode);

export default router;
