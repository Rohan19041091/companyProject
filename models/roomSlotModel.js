import mongoose from "mongoose";

const roomSlotSchema= new mongoose.Schema({
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room" 
    },
    startTime: {
        type: mongoose.Decimal128,
        required: true,
      },
    endTime: {
        type: mongoose.Decimal128,
        required: true,
      },
});

const roomSlot=new mongoose.model("roomSlot",roomSlotSchema)
export default roomSlot
