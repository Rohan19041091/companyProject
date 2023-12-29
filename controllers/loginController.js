import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from "../utils/constant.js";
import devices from "../models/devicesModel.js";
import { company } from "../models/companyModel.js";
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const userLogin=async(req,res)=>{
    const{email,password}=req.body;
    const user = await User.findOne({email});
    if(!user){
      sendErrorResponse(res, 400, 'user not found');
    }
    
    const userPasswordMatch =  bcrypt.compare(password,user.password)
    if(userPasswordMatch){
       const UserToken = jwt.sign({email:user.email,roles: 'user',role:user.role,userId:user._id,companyId: user.companyId},secretKey, { expiresIn: '1h' })
       sendResponse(res, "User token ", {UserToken});
    }
    else{
      sendErrorResponse(res, 400, 'incorrect password');
    }
  
  }


const deviceLogin=async(req,res)=>{
    const{email,password}=req.body;
    const device = await devices.findOne({email});
    if(!device){
      sendErrorResponse(res, 400, 'user not found');
    }
    const devicePasswordMatch = bcrypt.compare(password,device.password)
    if(devicePasswordMatch){
       const jwtToken = jwt.sign({email:devices.email,role: 'device',companyId:device.companyId},secretKey, { expiresIn: '1h' })
       sendResponse(res, "device token ", {jwtToken});
    }
    else{
      sendErrorResponse(res, 400, 'incorrect password');
    }
  
  }

  const companyLogin=async(req,res)=>{
    const{email,password}=req.body;
    const companys = await company.findOne({email});
    if(!companys){
      sendErrorResponse(res, 400, 'user not found');
    }
    const companyPasswordMatch = await bcrypt.compare(password,companys.password)
    if(companyPasswordMatch){
       const companyToken = jwt.sign({email:companys.email,role: 'company',companyId: companys._id},secretKey, { expiresIn: '1h' })
       sendResponse(res, "Company token ", {companyToken});

      

    }
    else{
      sendErrorResponse(res, 400, 'incorrect password');
    }
  
  }

  export {userLogin,deviceLogin,companyLogin} 