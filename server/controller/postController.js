import Post from "../modules/Post.js";
import User from "../modules/User.js";
import Follower from "../modules/Followers.js";
import { statusConstants } from "../utils/statusConstants.js";
import {messageConstants} from "../utils/messageConstants.js"
import { errorHandeler } from "../middleware/errorHandeler.js";

/* 
* add post
* METHOD  : POST
* @PATH   : /posts/add
* @Access : PRIVATE
*/
const addPost = async (request,response)=>{
    try{
        const user = await User.findById({_id:request.user._id});
        const {description,location} =request.body;
        if(request?.file?.filename){
            const newPost = new Post({
                user_id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                title:user.title,
                profilePath:user.profilePath,
                picturePath:request?.file?.filename,
                likes:{},
            });
            const savePost = await newPost.save();
            response.status(200).json(savePost);
        }else{
            response.status(statusConstants.VALIDATION_ERROR);
            errorHandeler(messageConstants.VALIDATION_ERROR,response);
        }
    }catch(err){
        response.status(500).json({error:err.message})
    }
}

/* 
* get login+followings posts
* METHOD  : GET
* @PATH   : /posts/get
* @Access : PRIVATE
*/
const getAllPosts = async (request,response)=>{
    
}

/* 
* get user posts
* METHOD  : GET
* @PATH   : /posts/user/:id
* @Access : PRIVATE
*/
const getUserPosts = async (request,response)=>{
    
}

/* 
* get profile post
* METHOD  : GET
* @PATH   : /posts/user
* @Access : PRIVATE
*/
const getProfilePosts = async (request,response)=>{
    
}

/* 
* get profile post
* METHOD  : PUT
* @PATH   : /posts/like/:id
* @Access : PRIVATE
*/
const likePost = async (request,response)=>{
    
}

/* 
* get profile post
* METHOD  : DELETE
* @PATH   : /posts/like/:id
* @Access : PRIVATE
*/
const disLikePost = async (request,response)=>{
    
}

/* 
* add comment
* METHOD  : POST
* @PATH   : /posts/comment
* @Access : PRIVATE
*/
const addComment = async (request,response)=>{
    
}

export {addPost,getAllPosts,getUserPosts,getProfilePosts,likePost,disLikePost,addComment}