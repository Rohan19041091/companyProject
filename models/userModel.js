import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    isDisable:{
        type:Boolean,
        default:false
    },
})

const User=new mongoose.model("User",userSchema)

export default User