import express from "express";
import router from "./routes/route.js";
import mongoose from "mongoose";
import { PORT,DATABASE_URL } from "./utils/constant.js";
const app=express();
const port=PORT;
mongoose.connect(DATABASE_URL,{
    dbName:"product",
}).then(()=>console.log("Database is Connected")).catch((e)=>console.log(e))

app.use(express.json());
app.use('/',router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });