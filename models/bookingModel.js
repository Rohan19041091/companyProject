import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    slotId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "roomSlot"
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

})

const booking = new mongoose.model("booking",bookingSchema)
export default booking