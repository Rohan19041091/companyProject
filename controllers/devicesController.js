import mongoose from "mongoose";
import devices from "../models/devicesModel.js";
import bcrypt from 'bcrypt'
import { sendResponse, sendErrorResponse } from "../utils/helper.js";


const createDevices = async (req, res) => {
  const { name, email, password, locationId, roomId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newDevices = await new devices({ name, email, password: hashedPassword, locationId, roomId });

  try {
      await newDevices.save();
      sendResponse(res, 200, 'Device created', newDevices);
  } catch (error) {
      console.error(error);
      sendErrorResponse(res, 500, 'Device not created');
  }
};

const getDeviceById = async (req, res) => {
  const { deviceId } = req.body;

  try {
      const device = await devices.findById(deviceId);

      if (!device) {
          sendErrorResponse(res, 404, 'Device not found');
      } else {
          sendResponse(res, 200, 'Device retrieved', device);
      }
  } catch (error) {
      console.error(error);
      sendErrorResponse(res, 500, 'Error getting device');
  }
};

const listDevices = async (req, res) => {
  try {
      const result = await devices.aggregate([
          {
              $lookup: {
                  from: 'location',
                  localField: 'location',
                  foreignField: '_id',
                  as: 'locationInfo',
              },
          },
          {
              $lookup: {
                  from: 'room',
                  localField: 'roomId',
                  foreignField: '_id',
                  as: 'roomInfo',
              },
          },
          {
              $lookup: {
                  from: 'company',
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

      sendResponse(res, 200, 'List of devices', result);
  } catch (error) {
      console.error(error);
      sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

const getDeviceByCompanyId=async (req, res) => {
    const companyId = req.user.companyId;

    try {
        // Find devices by company ID
        const devicesList = await devices.find({ companyId });

        if (!devicesList || devicesList.length === 0) {
            return sendErrorResponse(res, 404, 'No devices found for the given company ID');
        }

        sendResponse(res, 200, 'Devices retrieved successfully', devicesList);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting devices by company ID');
    }
};

export{createDevices,getDeviceById,listDevices,getDeviceByCompanyId}