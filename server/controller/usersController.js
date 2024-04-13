import User from "../modules/User.js";
import Follower from "../modules/Followers.js";
import { statusConstants } from "../utils/statusConstants.js";
import {messageConstants} from "../utils/messageConstants.js"
import { errorHandeler } from "../middleware/errorHandeler.js";
import Post from "../modules/Post.js";


/* 
* METHOD  : GET
* @PATH   : /users/profile
* @Access : PRIVATE
*/
const profile = async (request,response) =>{
    const user = await User.findById({_id:request.user._id});
    const posts = await Post.find({ user_id: user._id }).sort({ createdAt: -1 });
    user.posts = posts;
    response.status(200).json(user)
}

/* 
* METHOD  : GET
* @PATH   : /users/:id
* @Access : PRIVATE
*/
const getUser = async (request,response) =>{
    const user = await User.findById({_id:request.params.id});
    if(user){
        const posts = await Post.find({ user_id: user._id }).sort({ createdAt: -1 });
        user.posts = posts;
        response.status(200).json(user)
    }else{
        response.status(statusConstants.NOT_FOUND);
        errorHandeler(messageConstants.USER_NOT_FOUND,response);
    }
}

/* 
* METHOD  : PUT
* @PATH   : /users/follow/:id
* @Access : PRIVATE
*/
const followUser = async (request,response) =>{
    const loginuser = await User.findById({_id:request.user._id});
    const user = await User.findById({_id:request.params.id});
    if(user){
        const alreadyFollowing = await Follower.find({
            follower_id:loginuser._id,
            following_id:user._id
        })
        if(alreadyFollowing.length<1){
            const follower = await Follower.create({
                follower_id:loginuser._id,
                following_id:user._id
            })
            const updatedFollower = await User.findByIdAndUpdate(
                loginuser._id,
                {following:(loginuser.following + 1)},
                {new:true}
            );
            const updatedFollowing = await User.findByIdAndUpdate(
                user._id,
                {follower:(user.following + 1)},
                {new:true}
            );
        }
        response.status(200).json({message:messageConstants.FOLLOWING_SUCCESSFULLY})
    }else{
        response.status(statusConstants.NOT_FOUND);
        errorHandeler(messageConstants.USER_NOT_FOUND,response);
    }
}

/* 
* METHOD  : DELETE
* @PATH   : /users/follow/:id
* @Access : PRIVATE
*/
const unFollowUser = async (request,response) =>{
    const loginuser = await User.findById(request.user._id);
    const user = await User.findById(request.params.id);
    if(user){
        const alreadyFollowing = await Follower.find({
            follower_id:loginuser._id,
            following_id:user._id
        })
        if(alreadyFollowing.length>0){
            const follower = await Follower.deleteMany({
                follower_id:loginuser._id,
                following_id:user._id
            })
            const updatedFollower = await User.findByIdAndUpdate(
                loginuser._id,
                {following:(loginuser.following) - 1},
                {new:true}
            );
            const updatedFollowing = await User.findByIdAndUpdate(
                user._id,
                {follower:(user.follower) - 1},
                {new:true}
            );
        }
        response.status(200).json({message:messageConstants.UNFOLLOWING_SUCCESSFULLY})
    }else{
        response.status(statusConstants.NOT_FOUND);
        errorHandeler(messageConstants.USER_NOT_FOUND,response);
    }
}

/* 
* METHOD  : GET
* @PATH   : /users/follower
* @Access : PRIVATE
*/
const getFollower = async (request, response) => {
    const follow = await Follower.find({follower_id:request.user._id});
    const followingIds = follow.map(item => item.following_id);
    const users = await User.find({ _id: { $in: followingIds } });
    response.status(200).json(users)
};

/* 
* METHOD  : GET
* @PATH   : /users/following
* @Access : PRIVATE
*/
const getFollowing = async (request,response) =>{
    const follow = await Follower.find({following_id:request.user._id});
    const followingIds = follow.map(item => item.follower_id);
    const users = await User.find({ _id: { $in: followingIds } });
    response.status(200).json(users)
}

export {profile,getUser,getFollowing,getFollower,followUser,unFollowUser}