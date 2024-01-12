import express from "express";
// import { Router } from "express";
import {
  addRoomToUser,
  getUserData,
  userLogin,
  userRegister,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/add-room", addRoomToUser);
router.get("/get-user/:userId", getUserData);
export default router;
