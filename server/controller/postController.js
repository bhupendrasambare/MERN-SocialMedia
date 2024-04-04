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
    try{
        const follow = await Follower.find({follower_id:request.user._id});
        let followingIds = follow.map(item => item.following_id);
        followingIds.push(request.user._id);
        const posts = await Post.find({ user_id: { $in: followingIds } }).sort({ createdAt: -1 });
        response.status(200).json(posts);
    }catch(err){
        response.status(500).json({error:err.message})
    }
}

/* 
* get user posts
* METHOD  : GET
* @PATH   : /posts/user/:id
* @Access : PRIVATE
*/
const getUserPosts = async (request,response)=>{
    try{
        const user = await User.findById(request.params.id);
        if(user){
            const posts = await Post.find({ user_id: user._id }).sort({ createdAt: -1 });
            response.status(200).json(posts);
        }else{
            response.status(statusConstants.NOT_FOUND);
            errorHandeler(messageConstants.USER_NOT_FOUND,response);
        }
    }catch(err){
        response.status(500).json({error:err.message})
    }
}

/* 
* get profile post
* METHOD  : GET
* @PATH   : /posts/user
* @Access : PRIVATE
*/
const getProfilePosts = async (request,response)=>{
    try{
        const posts = await Post.find({ user_id: request.user._id }).sort({ createdAt: -1 });
        response.status(200).json(posts);
    }catch(err){
        response.status(500).json({error:err.message})
    }
}

/* 
* get profile post
* METHOD  : PUT
* @PATH   : /posts/like/:id
* @Access : PRIVATE
*/
const likePost = async (request,response)=>{
    try{
        const post = await Post.findById(request.params.id);
        if(post){
            console.log(post);
            const isLiked = post.likes.get(request.user._id);
            if(isLiked){
                post.likes.delete(request.user._id); 
            }else{
                post.likes.set(request.user._id,true);
            }

            const updatePost = await Post.findByIdAndUpdate(
                request.params.id,
                {likes:post.likes},
                {new:true}
            )
            response.status(200).json(updatePost);
        }else{
            response.status(statusConstants.NOT_FOUND);
            errorHandeler(messageConstants.POST_NOT_FOUND,response);
        }
    }catch(err){
        response.status(500).json({error:err.message})
    }
}

/* 
* add comment
* METHOD  : POST
* @PATH   : /posts/comment
* @Access : PRIVATE
*/
const addComment = async (request,response)=>{
    
}

export {addPost,getAllPosts,getUserPosts,getProfilePosts,likePost,addComment}