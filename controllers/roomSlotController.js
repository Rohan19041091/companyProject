import RoomSlot from "../models/roomSlotModel.js";


const createRoomSlot=async(req,res)=>{
    const {roomId,startTime,endTime}=req.body
    const newRoomSlot= await new RoomSlot({roomId,startTime,endTime})
    try {
       await  newRoomSlot.save();
       res.json({message:"RoomSlot created"})
     } catch (error) {
         res.status(500).json({message:"RoomSlot is not created"})
     }
}
const getRoomSlotById=async(req,res)=>{
    const { roomSlotId } = req.body

    try {
        const roomSlot = await RoomSlot.findById(roomSlotId);

        
        if (!roomSlot) {
            return res.status(404).json({ message: 'roomSlot is not found' });
        }

        res.json(roomSlot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting divice' });
    }

}
export {createRoomSlot,getRoomSlotById}