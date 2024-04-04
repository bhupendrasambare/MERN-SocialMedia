import mongoose from "mongoose";

const followerSchema = mongoose.Schema({
    reciver_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"User"
    },
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"User"
    },
    firstName:String,
    lastName:String,
    title:String,
    profilePath:String,
    picturePath:String,
    message:String,
    location:String,
},{
    timestamps:true
}
)
const Follower = mongoose.model("Follower",followerSchema);
export default Follower;