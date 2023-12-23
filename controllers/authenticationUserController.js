import  jwt  from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";
import User from "../models/userModel.js";
const userData={
    user_id: User.id,
    username: User.name,
    email: User.email
}
// const jwtToken= jwt.sign(userData,secretKey,{ expiresIn: '1h' })
const authUserMiddleWare=(req,res,next)=>{
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    try {
        req.user = decoded;
        if (decoded.role !== 'user') {
            return res.status(403).json({ message: 'Forbidden - User access required' });
        }
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}



export default authUserMiddleWare