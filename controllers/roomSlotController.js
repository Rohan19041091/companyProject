import RoomSlot from "../models/roomSlotModel.js";


const createRoomSlot=async(req,res)=>{
    const {roomId,startTime,endTime}=req.body
    const newRoomSlot= await new RoomSlot({roomId,startTime,endTime})
    try {
       await  newRoomSlot.save();
       res.json({
        success: true,
        message: "Room Slot created",
        data: newRoomSlot // Include the data in the response
    });
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
const getSlotByRoomId = async (req, res) => {
    const { roomId } = req.body;

    try {
        const roomSlots = await RoomSlot.find({ roomId });

        if (!roomSlots || roomSlots.length === 0) {
            return res.status(404).json({ message: 'No room slots found for the given room ID' });
        }

        res.json(roomSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting room slots by room ID' });
    }
};

export {createRoomSlot,getRoomSlotById,getSlotByRoomId}