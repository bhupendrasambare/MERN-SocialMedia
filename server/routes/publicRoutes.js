import express from "express";
import { register, login } from "../controller/publicController.js";
import upload from "../middleware/upload.js";

const authRouter = express.Router();

// authRouter.post("/assets", register);

export default authRouter;
