import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../modules/User.js";
import {statusConstants} from "../utils/statusConstants.js"
import { messageConstants } from "../utils/messageConstants.js";
import { errorHandeler } from "../middleware/errorHandeler.js";

/**
 * PATH : /auth/register
 * @Access : PUBLIC
 *  */
export const register = async (request,response)=>{
    try{
        const {firstName,lastName,email,password,bio,title,picturePath,location} =request.body;
        //Generate password encryption
        const passwordHash = await bcrypt.hash(password,10);
        const follower = 0,following=0;
        const NewUser = new User({
            firstName,lastName,email,picturePath:request?.file?.filename,password:passwordHash,bio,location,location,title,follower,following
        });
        const saveUser = await NewUser.save();
        response.status(200).json(saveUser);
    }catch(err){
        response.status(500).json({error:err.message})
    }
}

/**
 * PATH : /auth/login
 * @Access : PUBLIC
 *  */
export const login = async (request,response)=>{
    try{
        const {email,password} =request.body;
        const user = await User.findOne({email});
        if(user==null){
            response.status(statusConstants.VALIDATION_ERROR);
            errorHandeler(messageConstants.INVALID_EMAIL,response);
        }else{
            
            const valid = await bcrypt.compare(password,user.password);
            if(valid){
                const accessToken = jwt.sign({
                    user:{
                        _id:user._id,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,
                        picturePath:user.picturePath,
                        bio:user.bio,
                        location:user.location,
                        title:user.title,
                    }
                },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
                response.status(200).json({token:accessToken,user:user})
            }else{
                response.status(500);
                errorHandeler(messageConstants.INVALID_PASSWORD,response);
            }
        }        
    }catch(err){
        response.status(500).json({error:err.message})
    }
}

/**
 * PATH : /auth/forogt
 * @Access : PUBLIC
 *  */
export const forgot = async (request,response)=>{
    try{
        const {email} =request.body;
        const user = await User.findOne({email});
        console.log(user)
        if(user==null){
            response.status(statusConstants.VALIDATION_ERROR);
            errorHandeler(messageConstants.INVALID_EMAIL,response);
        }else{
            const passwordHash = await bcrypt.hash('password@123',10);
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {password:passwordHash},
                {new:true}
            );
            response.status(200).json({user:updatedUser})
            
        }        
    }catch(err){
        response.status(500).json({error:err.message})
    }
}
