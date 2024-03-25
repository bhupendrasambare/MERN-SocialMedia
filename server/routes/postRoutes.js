import express from "express";
import upload from "../middleware/upload.js";
import {validate}  from "../middleware/validate.js"
import {addPost,getAllPosts,getUserPosts,getProfilePosts,likePost,disLikePost,addComment} from "../controller/postController.js"



const postRouter = express.Router();

postRouter.post("/add",validate,upload.single("picturePath"),addPost);
postRouter.get("/get",validate,getAllPosts);
postRouter.get("/user/:id",validate,getUserPosts);
postRouter.get("/user",validate,getProfilePosts);
postRouter.put("/like/:id",validate,likePost);
postRouter.delete("/like/:id",validate,disLikePost);
postRouter.post("/posts/comment",validate,addComment);

export default postRouter;