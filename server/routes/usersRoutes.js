import express from "express";
import {validate}  from "../middleware/validate.js"
import {followUser, getFollower, getFollowing, getUser, profile, unFollowUser} from "../controller/usersController.js"

const usersRouter = express.Router();

usersRouter.get("/profile",validate,profile);
usersRouter.get("/profile/:id",validate,getUser);

usersRouter.get("/follower",validate,getFollower);
usersRouter.get("/following",validate,getFollowing);

usersRouter.route("/follow/:id").put(validate,followUser).delete(validate,unFollowUser);

export default usersRouter;