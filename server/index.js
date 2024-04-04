import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import postRouter from "./routes/postRoutes.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//GET ASSETS
app.use(express.static(path.join(__dirname, "public/assets")));

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// CONFIGURE REQUEST DATA SIZE
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/**
 * Define Routes
 * @auth /auth/register, /auth/login
 */
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);

/* 
* add error handling for universal errors
*/

const SERVER_PORT = process.env.SERVER_PORT || 9001;
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`Server running on port ${SERVER_PORT}`);
    });
}).catch((error) => {
    console.log("Error starting server", error);
});
