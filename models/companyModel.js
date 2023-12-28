import mongoose from "mongoose";

const comapnySchema=new mongoose.Schema({
    name:String,
    companyName:String,
    email:{ type: String, unique: true },
    password:String,
    location:[]
})

const Company=new mongoose.model("Company",comapnySchema)
export {Company,}