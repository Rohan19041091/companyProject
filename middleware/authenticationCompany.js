import  jwt  from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";
import { company } from "../models/companyModel.js";
const userData={
    user_id: company.id,
    username: company.name,
    email: company.email
}
// const jwtToken= jwt.sign(userData,secretKey,{ expiresIn: '1h' })
const authCompanyMiddleWare = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return sendErrorResponse(res, 401, 'Unauthorized - Missing token');
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);

        if (decoded.role !== 'company') {
            return sendErrorResponse(res, 403, 'Forbidden - Company access required');
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return sendErrorResponse(res, 401, 'Unauthorized - Invalid token');
    }
};


export default authCompanyMiddleWare