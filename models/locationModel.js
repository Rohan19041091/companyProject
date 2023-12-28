import mongoose from "mongoose";
 const locationSchema=new mongoose.Schema({
    name:{ type: String, unique: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: "Company"
  },
 })

const Location=new mongoose.model("Location",locationSchema)
export default Location