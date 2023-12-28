import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from "../utils/constant.js";
import Devices from "../models/devicesModel.js";
import { Company } from "../models/companyModel.js";
const userLogin=async(req,res)=>{
    const{email,password}=req.body;
    const user = await User.findOne({email});
    if(!user){
       return res.status(400).json({message:"user not found"})
    }
    
    const userPasswordMatch =  bcrypt.compare(password,user.password)
    if(userPasswordMatch){
       const UserToken = jwt.sign({email:user.email,role: 'user',userId:user._id,companyId: user.companyId},secretKey, { expiresIn: '1h' })
       res.json({UserToken})
    }
    else{
       res.status(400).json({message:"incorrect password"})
    }
  
  }


const deviceLogin=async(req,res)=>{
    const{email,password}=req.body;
    const device = await Devices.findOne({email});
    if(!device){
       return res.status(400).json({message:"user not found"})
    }
    const devicePasswordMatch = bcrypt.compare(password,device.password)
    if(devicePasswordMatch){
       const jwtToken = jwt.sign({email:Devices.email,role: 'device'},secretKey, { expiresIn: '1h' })
       res.json({jwtToken})
    }
    else{
       res.status(400).json({message:"incorrect password"})
    }
  
  }

  const companyLogin=async(req,res)=>{
    const{email,password}=req.body;
    const company = await Company.findOne({email});
    if(!company){
       return res.status(400).json({message:"user not found"})
    }
    const companyPasswordMatch = await bcrypt.compare(password,company.password)
    if(companyPasswordMatch){
       const companyToken = jwt.sign({email:company.email,role: 'company',companyId: company._id},secretKey, { expiresIn: '1h' })
       res.json({companyToken})
      

    }
    else{
       res.status(400).json({message:"incorrect password"})
    }
  
  }

  export {userLogin,deviceLogin,companyLogin} 