import mongoose from "mongoose";

const amenitySchema=new mongoose.Schema({
    name:String
})
const Amenity =mongoose.model("Amenity",amenitySchema)
export default Amenity