import mongoose from "mongoose";

const amenitySchema=new mongoose.Schema({
    name:{ type: String, unique: true },
})
const Amenity =mongoose.model("Amenity",amenitySchema)
export default Amenity