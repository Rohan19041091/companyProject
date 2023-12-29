import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:String,
    email:{ type: String, unique: true },
    password:String,
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
    role:String  
})

const user=new mongoose.model("user",userSchema)

export default user