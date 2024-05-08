// All required imports that are used
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
// function for connecting database
const connectDb = async()=>{
   await mongoose.connect(process.env.URL)
   .then(()=>console.log("db is connected"))
   .catch((err)=>{
    console.log(err);
   })
}

export default connectDb;