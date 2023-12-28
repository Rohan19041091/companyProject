import mongoose from "mongoose";
import Room from "../models/roomModel.js";

const createRoom=async(req,res)=>{
 const{name,description,amenites,locationId,capacity}=req.body
 const companyId = req.user.companyId;
 const newRoom = await new Room({name,description,amenites,companyId,locationId,capacity})
 try {
    await newRoom.save()
    res.json({
        success: true,
        message: "Room created",
        data: newRoom 
    });
 } catch (error) {
    console.log(error)
    res.status(500).json({message:"Room not created"})
 }
}


const getRoomById = async (req, res) => {
    const companyId = req.user.companyId;

    try {
        const rooms = await Room.find({ companyId });

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found for the given company ID' });
        }

        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting rooms by company ID' });
    }
};

const getRoomByCompanyId = async (req, res) => {
    const companyId = req.user.companyId;

    try {
        const rooms = await Room.aggregate([
            {
                $match: {
                    companyId: companyId
                }
            },
            {
                $lookup: {
                    from: 'amenity',
                    localField: 'amenities',
                    foreignField: '_id',
                    as: 'amenities'
                }
            }
        ]);
    res.json(rooms)
    console.log("Aggregation Result:", rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting rooms by company ID' });
    }
    
}

export {createRoom,getRoomById,getRoomByCompanyId}