import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    name:String,
    description:String,
    amenities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity"  // Replace "Amenity" with the actual model name referencing the amenities
      }],
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