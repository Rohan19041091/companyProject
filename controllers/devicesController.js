import mongoose from "mongoose";
import Devices from "../models/devicesModel.js";
import bcrypt from 'bcrypt'

const createDevices=async(req,res)=>{
    const {name,email,password,locationId,roomId}=req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const newDevices= await new Devices({name,email,password:hashedPassword,locationId,roomId})
    try {
       await  newDevices.save();
       res.json({message:"Devices created"})
     } catch (error) {
         res.status(500).json({message:"Devicces is not created"})
     }
}

const getDeviceById=async(req,res)=>{
    const { deviceId } = req.body

    try {
        const device = await Devices.findById(deviceId);

        
        if (!device) {
            return res.status(404).json({ message: 'Device is not found' });
        }

        res.json(device);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting divice' });
    }

}

const listDevices = async (req, res) => {
    try {
      const result = await Devices.aggregate([
        {
          $lookup: {
            from: 'Location',
            localField: 'location',
            foreignField: '_id',
            as: 'locationInfo',
          },
        },
        {
          $lookup: {
            from: 'Room',
            localField: 'roomId',
            foreignField: '_id',
            as: 'roomInfo',
          },
        },
        {
          $lookup: {
            from: 'Company',
            localField: 'companyId',
            foreignField: '_id',
            as: 'companyInfo',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            locationInfo: 1,
            roomInfo: 1,
            isDisable: 1,
            companyInfo: 1,
          },
        },
      ]);
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export{createDevices,getDeviceById,listDevices}