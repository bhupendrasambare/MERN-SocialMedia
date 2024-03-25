import jwt from "jsonwebtoken";
import { statusConstants } from "../utils/statusConstants.js";

export const validate = async (request,response,next)=>{
    let token;
    let authHeaders = request.headers.Authorization || request.headers.authorization;
    if(authHeaders && authHeaders.startsWith("Bearer")){
        token= authHeaders.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (erroor,decoded)=>{
            if(erroor){
                response.status(401);
                throw new Error(statusConstants.UNAUTHORISED);
            }
            request.user = decoded.user;
            next();
        })
    }else{
        response.status(statusConstants.UNAUTHORISED);
        errorHandeler(messageConstants.UNAUTHORISED,response);
    }
}