import mongoose from "mongoose";
import { Company } from "../models/companyModel.js";
import bcrypt from 'bcrypt'
const createCompany=async(req,res)=>{
    const {name,companyName,email,password,location}=req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const newCompany=await new Company({name,companyName,email,password:hashedPassword,location})
    try {
        await  newCompany.save();
        res.json({message:"user created"})
      } catch (error) {
          res.status(500).json({message:"company not created"})
      }
    }

const listCompany=async(req,res)=>{
    try {
        const list=await Company.find();
     res.json(list) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error listing companies' });
    
    }
    
}
export{createCompany,listCompany}