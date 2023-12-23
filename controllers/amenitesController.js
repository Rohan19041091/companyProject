import Amenity from "../models/amenitesModel.js";

const createAmenity=async(req,res)=>{
    const {name}=req.body
    const newAmenity= new Amenity({name})
    try {
       await  newAmenity.save();
       res.json({message:"Amenity created"})
     } catch (error) {
         res.status(500).json({message:"Amenity is not created"})
     }
}

const listAmenity=async(req,res)=>{
    const list=await Amenity.find()
    res.json(list)
}
export{createAmenity,listAmenity}