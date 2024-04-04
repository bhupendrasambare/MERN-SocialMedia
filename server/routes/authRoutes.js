import express from "express";
import { register, login, forgot } from "../controller/authController.js";
import upload from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/register",upload.single("picture"), register);
authRouter.post("/login", login);
authRouter.post("/forgot", forgot);

export default authRouter;
