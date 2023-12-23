import  jwt  from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";
import { Company } from "../models/companyModel.js";
const userData={
    user_id: Company.id,
    username: Company.name,
    email: Company.email
}
// const jwtToken= jwt.sign(userData,secretKey,{ expiresIn: '1h' })
const authCompanyMiddleWare=(req,res,next)=>{
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    try {
        

        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        if (decoded.role !== 'company') {
            return res.status(403).json({ message: 'Forbidden - company access required' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}



export default authCompanyMiddleWare