import user from "../models/userModel.js";
import bcrypt from 'bcrypt'
import {sendResponse,sendErrorResponse} from "../utils/helper.js";
const createUser=async(req,res)=>{
     const {name,email,password}=req.body
     const companyId = req.user.companyId;
     console.log(req.user)
     const hashedPassword = await bcrypt.hash(password,10)
     const newUser= await new user({name,email,password:hashedPassword,companyId})
     try {
        await  newUser.save();
        sendResponse(res, "User created", newUser);
      } catch (error) {
        sendErrorResponse(res, 500, 'Error creating user');
      }
}

const getUserById=async(req,res)=>{
    const { userId } = req.body

    try {
        const user = await user.findById(userId);

        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        sendResponse(res, "User", user);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error creating user');
    }

}

const updateUserById =async(req,res)=>{
    const value=req.body
    
   try {
    const updatedUser = await user.findByIdAndUpdate(
        value.id,
        value
    );


    if (!updatedUser) {
        return   sendErrorResponse(res, 404, 'user not found');
    }

    sendResponse(res, "User Updated", updatedUser);
   } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Error updating user');;
   }
}
const getUsersByCompanyId = async (req, res) => {
    const companyId = req.user.companyId; // Assuming you have the company ID in the user object

    try {
        // Find users based on the company ID
        const users = await user.find({ companyId });

        if (!users || users.length === 0) {
            return sendErrorResponse(res, 404, 'No users found for the given company ID');
        }

        sendResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting users by company ID');
    }
};
export{createUser,getUserById,updateUserById,getUsersByCompanyId}