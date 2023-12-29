import mongoose from "mongoose";
import { company } from "../models/companyModel.js";
import bcrypt from 'bcrypt'
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const createCompany = async (req, res) => {
    const { name, companyName, email, password, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = await new company({ name, companyName, email, password: hashedPassword, location });

    try {
        await newCompany.save();
        sendResponse(res, 200, 'Company created', newCompany);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Company not created');
    }
};

const listCompany = async (req, res) => {
    try {
        const list = await company.find();
        sendResponse(res, 200, 'List of companies', list);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error listing companies');
    }
};

const getCompanyRequest = async (req, res) => {
    try {
        const list = await company.find({ isDisable: { $ne: true } });
        sendResponse(res, 200, 'List of active companies', list);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error getting active companies');
    }
};

const acceptCompnyRequest=async (req, res) => {
    const companyId = req.query;

    try {
        const existingCompany = await company.findById(companyId);

        if (!existingCompany) {
            return sendErrorResponse(res, 404, 'Company not found');
        }

        existingCompany.isDisable = false;

        await existingCompany.save();

        sendResponse(res, 200, 'Company request accepted successfully', existingCompany);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error accepting company request');
    }
};
export{createCompany,listCompany,getCompanyRequest,acceptCompnyRequest}