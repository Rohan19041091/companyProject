import  jwt  from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";
import user from "../models/userModel.js";
import {sendResponse,sendErrorResponse} from "../utils/helper.js";
const userData={
    user_id: user.id,
    username: user.name,
    email: user.email
}
// const jwtToken= jwt.sign(userData,secretKey,{ expiresIn: '1h' })
const authSuperAdminMiddleWare = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return sendErrorResponse(res, 401, 'Unauthorized - Missing token');
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);

        if (decoded.role !== 'superAdmin') {
            return sendErrorResponse(res, 403, 'Forbidden - User access required');
        }
         
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return sendErrorResponse(res, 401, 'Unauthorized - Invalid token');
    }
};



export default authSuperAdminMiddleWare