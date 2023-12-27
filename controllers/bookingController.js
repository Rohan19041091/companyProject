import Booking from "../models/bookingModel.js";

const createBooking=async(req,res)=>{
    const {slotId,companyId,userId}=req.body
    const newBooking= await new Booking({slotId,companyId,userId})
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
export{createBooking}