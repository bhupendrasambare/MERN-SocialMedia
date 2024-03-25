import { messageConstants } from "../utils/messageConstants.js";
import {statusConstants} from "../utils/statusConstants.js"

export const errorHandeler = (message, response) => {
    const statusCode = response.statusCode || 500;
    let statusMsg = messageConstants.ERROR;
    switch (statusCode){
        case statusConstants.VALIDATION_ERROR:
            statusMsg = messageConstants.VALIDATION_ERROR;break;
        case statusConstants.UNAUTHORISED:
            statusMsg = messageConstants.UNAUTHORISED;break;
        case statusConstants.FORBIDDEN:
            statusMsg = messageConstants.FORBIDDEN;break;
        case statusConstants.NOT_FOUND:
            statusMsg = messageConstants.NOT_FOUND;break;
        case statusConstants.INTERNAL_SERVER_ERROR:
            statusMsg = messageConstants.INTERNAL_SERVER_ERROR;break;
    }
    response.json({message:message, status : statusMsg,statusCode:statusCode, timeStamp :new Date().toISOString()})
}