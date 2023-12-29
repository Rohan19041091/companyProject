import  jwt  from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";
import devices from "../models/devicesModel.js";

// const jwtToken= jwt.sign(userData,secretKey,{ expiresIn: '1h' })
const authDevicesMiddleWare=(req,res,next)=>{
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    try {
        

        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        if (decoded.role !== 'device') {
            return res.status(403).json({ message: 'Forbidden - Device access required' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}



export default authDevicesMiddleWare