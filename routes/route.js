import express from 'express';
import { createUser, getUserById, updateUserById } from '../controllers/userController.js';
import { createRoomSlot, getRoomSlotById } from '../controllers/roomSlotController.js';
import { createRoom, getRoomById } from '../controllers/roomController.js';
import { createLocation, getLocationById } from '../controllers/loactioncontroller.js';
import { createDevices, getDeviceById, listDevices } from '../controllers/devicesController.js';
import { createCompany, listCompany } from '../controllers/companyController.js';
import { createBooking } from '../controllers/bookingController.js';
import { createAmenity, listAmenity } from '../controllers/amenitesController.js';
import {companyLogin, deviceLogin, userLogin} from '../controllers/loginController.js';
import authUserMiddleWare from '../controllers/authenticationUserController.js';
import authDevicesMiddleWare from '../controllers/authenticationDevices.js';
import authCompanyMiddleWare from '../controllers/authenticationCompany.js';
const router = express.Router();


router.post("/createUser",createUser)
router.post('/getUserById',authUserMiddleWare,getUserById)
router.post('/UpdateUserById',authUserMiddleWare,updateUserById)

router.post('/createRoomSlot',authUserMiddleWare,createRoomSlot)
router.post('/getRoomSlotById',authUserMiddleWare,getRoomSlotById)

router.post('/createRoom',authUserMiddleWare,createRoom)
router.post('/getRoomById',authUserMiddleWare,getRoomById)

router.post('/createLocation',createLocation)
router.post('/getLocationById',authUserMiddleWare,getLocationById)

router.post('/createDevices',createDevices)
router.post('/getDeviceById',authUserMiddleWare,getDeviceById)
router.get('/listDevices',authDevicesMiddleWare,listDevices)

router.post('/createCompany',createCompany)
router.get('/listCompany',authCompanyMiddleWare,listCompany)

router.post('/createBooking',createBooking)

router.post('/createAmenity',createAmenity)
router.get('/listAmenity',authUserMiddleWare,listAmenity)
router.post('/loginUser',userLogin)
router.post('/loginDevice',deviceLogin)
router.post('/loginCompany',companyLogin)
export default router;