import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:[true],
            ref:"User"
        },
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
        title:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        profilePath:{
            type:String
        },
        picturePath:{
            type:String
        },
        description:String,
        location:String,
        likes:{
            type:Map,
            of:Boolean
        },
        comments:{
            types:Array,
            default:[]
        }
    },{timestamps:true}
);

const Post = mongoose.model("Post",postSchema);
export default Post;