import express from 'express';
import { createUser, getUserById, getUsersByCompanyId, updateUserById } from '../controllers/userController.js';
import { createRoomSlot, getRoomSlotById, getSlotByRoomId } from '../controllers/roomSlotController.js';
import { createRoom, getRoomByCompanyId, getRoomByLocationId} from '../controllers/roomController.js';
import { createLocation, getLocationByCompanyId, getLocationById } from '../controllers/loactioncontroller.js';
import { createDevices, getDeviceByCompanyId, getDeviceById, listDevices } from '../controllers/devicesController.js';
import { acceptCompnyRequest, createCompany, getCompanyRequest, listCompany } from '../controllers/companyController.js';
import { createBooking, getAllBookings, getBookingsByCompanyId } from '../controllers/bookingController.js';
import { createAmenity, listAmenity } from '../controllers/amenitesController.js';
import {companyLogin, deviceLogin, userLogin} from '../controllers/loginController.js';
import authUserMiddleWare from '../middleware/authenticationUserController.js';
import authDevicesMiddleWare from '../middleware/authenticationDevices.js';
import authCompanyMiddleWare from '../middleware/authenticationCompany.js';
import authSuperAdminMiddleWare from '../middleware/autenticationSuperAdmin.js';
const router = express.Router();


router.post("/createUser",authCompanyMiddleWare,createUser)
router.post('/getUserById',authUserMiddleWare,getUserById)
router.post('/UpdateUserById',authUserMiddleWare,updateUserById)
router.get('/getUserBycompanyId',authSuperAdminMiddleWare,getUsersByCompanyId)

router.post('/createRoomSlot',authUserMiddleWare,createRoomSlot)
router.post('/getRoomSlotById',authUserMiddleWare,getRoomSlotById)
router.post('/getSlotByRoomId',authUserMiddleWare,getSlotByRoomId)

router.post('/createRoom',authCompanyMiddleWare,createRoom)
router.post('/getRoomByCompanyId',authCompanyMiddleWare,getRoomByCompanyId)
router.get('/getRoomByLocationId',authSuperAdminMiddleWare,getRoomByLocationId)

router.post('/createLocation',createLocation)
router.post('/getLocationById',authCompanyMiddleWare,getLocationById)
router.post('/getLocationByCompanyId',authCompanyMiddleWare,getLocationByCompanyId)

router.post('/createDevices',createDevices)
router.post('/getDeviceById',authUserMiddleWare,getDeviceById)
router.get('/listDevices',authDevicesMiddleWare,listDevices)
router.get('/getDeviceByCompanyId',authSuperAdminMiddleWare,getDeviceByCompanyId)

router.post('/createCompany',createCompany)
router.get('/listCompany',authCompanyMiddleWare,listCompany)
router.get('/getCompanyRequest',authSuperAdminMiddleWare,getCompanyRequest)
router.post('/acceptCompnyRequest',authSuperAdminMiddleWare,acceptCompnyRequest)

router.post('/createBooking',authUserMiddleWare,createBooking)
router.get('/getBookingsByCompanyId',authCompanyMiddleWare,getBookingsByCompanyId)
router.get('/getBookingByRoomId',authSuperAdminMiddleWare,getBookingsByCompanyId)
router.get('/getAllBooking',authSuperAdminMiddleWare,getAllBookings)


router.post('/createAmenity',createAmenity)
router.get('/listAmenity',authUserMiddleWare,listAmenity)
router.post('/loginUser',userLogin)
router.post('/loginDevice',deviceLogin)
router.post('/loginCompany',companyLogin)
export default router;