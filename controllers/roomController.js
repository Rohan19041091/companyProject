import mongoose from "mongoose";
import Room from "../models/roomModel.js";

const createRoom=async(req,res)=>{
 const{name,description,amenites,companyId,locationId,capacity}=req.body
 const newRoom = await new Room({name,description,amenites,companyId,locationId,capacity})
 try {
    await newRoom.save()
    res.json({message:"Room is created"})
 } catch (error) {
    res.status(500).json({message:"Room not created"})
 }
}


const getRoomById=async(req,res)=>{
    const {roomId}=req.body
    try {
        const room = await Room.findById(roomId);

        
        if (!roomId) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting loaction' });
    }
}
export {createRoom,getRoomById}