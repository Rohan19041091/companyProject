import mongoose from "mongoose";
import Location from "../models/locationModel.js";
const createLocation=async(req,res)=>{
   const {name}=req.body
   const newLocation= await new Location({name})
   try {
     await newLocation.save()
     res.json({message:"location is saved "})
   } catch (error) {
    res.status(500).json({message:"location not created"})
   }
}

const getLocationById=async(req,res)=>{
    const {locationId}=req.body
    try {
        const location = await Location.findById(locationId);

        
        if (!location) {
            return res.status(404).json({ message: 'location not found' });
        }

        res.json(location);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting loaction' });
    }
}
export{createLocation,getLocationById}