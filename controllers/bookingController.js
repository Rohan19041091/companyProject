import Booking from "../models/bookingModel.js";
import mongoose from "mongoose";
const createBooking=async(req,res)=>{
    const {slotId,roomId}=req.body
    const companyId = req.user.companyId;
    const userId =req.user.userId
    console.log( req.user.companyId)
    const newBooking= await new Booking({slotId,roomId,companyId,userId})
    try {
       await  newBooking.save();
       res.json({
        success: true,
        message: "Booking created",
        data: newBooking // Include the data in the response
    });
     } catch (error) {
         res.status(500).json({message:"Booking is not created"})
     }
}
const getBookingsByCompanyId = async (req, res) => {
    const companyId = req.user.companyId;

    try {
        const bookings = await Booking.aggregate([
            {
                $match: {
                    companyId:companyId
                }
            },
            {
                $lookup: {
                    from: 'RoomSlot',
                    localField: 'slotId',
                    foreignField: '_id',
                    as: 'slot'
                }
            },
            {
                $lookup: {
                    from: 'Room',
                    localField: 'roomId',
                    foreignField: '_id',
                    as: 'room'
                }
            },
            {
                $lookup: {
                    from: 'Company',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'company'
                }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            
        ]);

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting bookings by company ID' });
    }
};

export{createBooking,getBookingsByCompanyId}