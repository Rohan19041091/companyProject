import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    name:String,
    description:String,
    amenites:{
        type: mongoose.Schema.Types.Mixed,
    },
    slot:String,
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Company"
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref :"Location"
    },
    capacity:String
})

const Room=new mongoose.model("Room",roomSchema)
export default Room