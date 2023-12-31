import mongoose from "mongoose";

const devicesSchema=new mongoose.Schema({
    name:String,
    email:{ type: String, unique: true },
    password:String,
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room" 
    },
    isDisable:{
        type:Boolean,
        default:false
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
})

const devices =new mongoose.model("devices",devicesSchema)
export default devices