import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            require:true,
            min:2,
            max:50
        },
        lastName:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        email:{
            type:String,
            required:true,
            unique:true,
            max:50
        },
        password:{
            type:String,
            required:true
        },
        picturePath:{
            type:String,
            default:""
        },
        bio:{
            type:String,
            max:120
        },
        location:{
            type:String,
            max:120
        },
        title:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        follower:{
            type:Number
        },
        following:{
            type:Number
        }
    },
    {timestamps:true}
)

const User = mongoose.model("User",UserSchema);
export default User;