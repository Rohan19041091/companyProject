import mongoose from "mongoose";
import room from "../models/roomModel.js";
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const createRoom = async (req, res) => {
    const { name, description, amenities, locationId, capacity } = req.body;
    const companyId = req.user.companyId;

    const newRoom = await new room({ name, description, amenities, companyId, locationId, capacity });

    try {
        await newRoom.save();
        sendResponse(res, 'Room created', newRoom);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, 500, 'Room not created');
    }
};

const getRoomByCompanyId = async (req, res) => {
    const companyId = req.user.companyId;

    try {
        const rooms = await room.find({ companyId });

        if (!rooms || rooms.length === 0) {
            return sendErrorResponse(res, 404, 'No rooms found for the given company ID');
        }

        sendResponse(res, 'room', rooms);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting rooms by company ID');
    }
};

const getRoomByLocationId=async (req, res) => {
    const locationId = req.params.locationId;

    try {
        
        const roomsList = await room.find({ locationId });

        if (!roomsList || roomsList.length === 0) {
            return sendErrorResponse(res, 404, 'No rooms found for the given location ID');
        }

        sendResponse(res, 200, 'Rooms retrieved successfully', roomsList);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting rooms by location ID');
    }
};

export {createRoom,getRoomByCompanyId,getRoomByLocationId}