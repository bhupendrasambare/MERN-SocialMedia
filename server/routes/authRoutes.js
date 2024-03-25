import express from "express";
import { register, login } from "../controller/authController.js";
import upload from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/register",upload.single("picture"), register);
authRouter.post("/login", login);

export default authRouter;
