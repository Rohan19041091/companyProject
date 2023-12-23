import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
const createUser=async(req,res)=>{
     const {name,email,password,companyId,}=req.body
     const hashedPassword = await bcrypt.hash(password,10)
     const newUser= await new User({name,email,password:hashedPassword,companyId})
     try {
        await  newUser.save();
        res.json({message:"user created"})
      } catch (error) {
          res.status(500).json({message:"user not created"})
      }
}

const getUserById=async(req,res)=>{
    const { userId } = req.body

    try {
        const user = await User.findById(userId);

        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting user' });
    }

}

const updateUserById =async(req,res)=>{
    const value=req.body
    
   try {
    const updatedUser = await User.findByIdAndUpdate(
        value.id,
        value
    );


    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
   }
}
export{createUser,getUserById,updateUserById}