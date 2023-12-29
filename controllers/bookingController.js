import booking from "../models/bookingModel.js";
import roomSlot from "../models/roomSlotModel.js";
import mongoose from "mongoose";
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const ObjectId = mongoose.Types.ObjectId;
const createBooking = async (req, res) => {
    const { slotId, roomId } = req.body;
    const companyId = req.user.companyId;
    const userId = req.user.userId;

    try {
        const newBooking = await new booking({ slotId, roomId, companyId, userId }).save();
        sendResponse(res, 200, 'Booking created', newBooking);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Booking not created');
    }
};

const getBookingsByCompanyId = async (req, res) => {
    const companyId = req.user.companyId;

    try {
        const bookings = await booking.aggregate([
            {
                $match: {
                    companyId: new ObjectId(companyId)
                }
            },
            {
                $lookup: {
                    from: 'rooms',
                    localField: 'roomId',
                    foreignField: '_id',
                    as: 'room'
                }
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'roomslots',
                    localField: 'slotId',
                    foreignField: '_id',
                    as: 'slots'
                }
            },
            {
                $project: {
                    _id: 1,
                    roomId: 1,
                    companyId: 1,
                    userId: 1,
                    slotId: 1,
                    room: 1,
                    company: 1,
                    user: 1,
                    slots: 1,
                    slotCount: { $size: '$slots' } // Add this line to check the size of the 'slot' array
                }
            }
        ]);

        sendResponse(res, 200, 'Bookings retrieved', bookings);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting bookings by company ID');
    }
};

const getBookingByroomId=async (req, res) => {
    const roomId = req.query;

    try {
       
        const bookingsList = await booking.aggregate([
            {
                $match: {
                    roomId: new ObjectId(roomId)
                }
            },
            {
                $lookup: {
                    from: 'rooms',
                    localField: 'roomId',
                    foreignField: '_id',
                    as: 'room'
                },
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                },
            },
            {
                $lookup: {
                    from: 'roomslots',
                    localField: 'slotId',
                    foreignField: '_id',
                    as: 'slots'
                },
            },
            {
                $project: {
                    _id: 1,
                    roomId: 1,
                    companyId: 1,
                    userId: 1,
                    slotId: 1,
                    room: 1,
                    company: 1,
                    user: 1,
                    slots: 1,
                    slotCount: { $size: '$slots' } // Add this line to check the size of the 'slots' array
                },
            },
        ]);

        if (!bookingsList || bookingsList.length === 0) {
            return sendErrorResponse(res, 404, 'No bookings found for the given room ID');
        }

        sendResponse(res, 200, 'Bookings retrieved successfully', bookingsList);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting bookings by room ID');
    }
};
const getAllBookings = async (req, res) => {
    try {
    
        const bookingsList = await booking.aggregate([
        
            {
                $lookup: {
                    from: 'rooms',
                    localField: 'roomId',
                    foreignField: '_id',
                    as: 'room'
                },
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                },
            },
            {
                $lookup: {
                    from: 'roomslots',
                    localField: 'slotId',
                    foreignField: '_id',
                    as: 'slots'
                },
            },
    
            {
                $project: {
                    _id: 1,
                    roomId: 1,
                    companyId: 1,
                    userId: 1,
                    slotId: 1,
                    room: 1,
                    company: 1,
                    user: 1,
                    slots: 1,
                    slotCount: { $size: '$slots' }
                },
            },
        ]);

       
        if (!bookingsList || bookingsList.length === 0) {
            return sendErrorResponse(res, 404, 'No bookings found');
        }
        sendResponse(res, 200, 'Bookings retrieved successfully', bookingsList);
    } catch (error) {
        
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting bookings');
    }
};


export{createBooking,getBookingsByCompanyId,getBookingByroomId,getAllBookings}