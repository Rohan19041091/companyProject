import mongoose from "mongoose";
 const locationSchema=new mongoose.Schema({
    name:{ type: String, unique: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: "Company"
  },
 })

const location=new mongoose.model("location",locationSchema)
export default location