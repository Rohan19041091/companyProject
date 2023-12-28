import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    slotId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomSlot"
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

const Booking = new mongoose.model("Booking",bookingSchema)
export default Booking