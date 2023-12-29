import mongoose from "mongoose";

const amenitySchema=new mongoose.Schema({
    name:{ type: String, unique: true },
})
const amenity =mongoose.model("Amenity",amenitySchema)
export default amenity