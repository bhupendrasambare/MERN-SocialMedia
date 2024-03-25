import mongoose from "mongoose";

const followerSchema = mongoose.Schema({
    follower_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"User"
    },
    following_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"User"
    }
},{
    timestamps:true
}
)
const Follower = mongoose.model("Follower",followerSchema);
export default Follower;