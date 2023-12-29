import roomSlot from "../models/roomSlotModel.js";
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const createRoomSlot=async(req,res)=>{
    const {roomId,startTime,endTime}=req.body
    const newRoomSlot= await new roomSlot({roomId,startTime,endTime})
    try {
       await  newRoomSlot.save();
       sendResponse(res, "Slot is created", newRoomSlot);
     } catch (error) {
        console.log(error)
        sendErrorResponse(res, 500, 'Error creating user');
     }
}
const getRoomSlotById = async (req, res) => {
    const { roomSlotId } = req.body;

    try {
        const roomSlot = await roomSlot.findById(roomSlotId);

        if (!roomSlot) {
            return sendErrorResponse(res, 404, 'roomSlot is not found');
        }

        sendSuccessResponse(res, 'roomSlot', roomSlot);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting device');
    }
};
const getSlotByRoomId = async (req, res) => {
    const { roomId } = req.body;

    try {
        const roomSlots = await roomSlot.find({ roomId });

        if (!roomSlots || roomSlots.length === 0) {
            return sendErrorResponse(res, 404, 'No room slots found for the given room ID');
        }

        sendSuccessResponse(res, 'roomSlot', roomSlots);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting room slots by room ID');
    }
};


export {createRoomSlot,getRoomSlotById,getSlotByRoomId}