import mongoose from "mongoose";
import location from "../models/locationModel.js";
const createLocation=async(req,res)=>{
   const {name}=req.body
   const companyId = req.user.companyId;
   const newLocation= await new location({name,companyId})
   try {
     await newLocation.save()
     res.json({
        success: true,
        message: "Location created",
        data: newLocation // Include the data in the response
    });
   } catch (error) {
    res.status(500).json({message:"location not created"})
   }
}

const getLocationById=async(req,res)=>{
    const {locationId}=req.body
    try {
        const location = await location.findById(locationId);

        
        if (!location) {
            return res.status(404).json({ message: 'location not found' });
        }

        res.json({
            success: true,
            message: "location",
            data: location // Include the data in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting loaction' });
    }
}

const getLocationByCompanyId = async (req, res) => {
    
    const companyId = req.user.companyId;

    try {
        const locations = await location.find({ companyId});

        if (!locations || locations.length === 0) {
            return res.status(404).json({ message: 'No locations found for the given company and location ID' });
        }

        res.json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting locations by company and location ID' });
    }
};

export{createLocation,getLocationById,getLocationByCompanyId}