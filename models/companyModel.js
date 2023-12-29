import mongoose from "mongoose";

const comapnySchema=new mongoose.Schema({
    name:String,
    companyName:String,
    email:{ type: String, unique: true },
    password:String,
    location:[],
    isDisable:{
        type:Boolean,
        default:true
    },
})

const company=new mongoose.model("company",comapnySchema)
export {company,}