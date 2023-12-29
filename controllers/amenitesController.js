import amenity from "../models/amenitesModel.js";
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const createAmenity = async (req, res) => {
    const { name } = req.body;
    const newAmenity = new amenity({ name });

    try {
        await newAmenity.save();
        sendResponse(res, 200, 'Amenity created', newAmenity);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Amenity not created');
    }
};

const listAmenity = async (req, res) => {
    try {
        const list = await amenity.find();
        sendResponse(res, 200, 'List of amenities', list);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error listing amenities');
    }
}
export{createAmenity,listAmenity}