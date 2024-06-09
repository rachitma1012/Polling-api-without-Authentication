// all imports 
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './src/config/dbconnection.js';
import router from './src/routes/allRoutes.js';
// dotenv configration
dotenv.config()
const app = express();
 // database connection
 connectDb();
// for parsing the data;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// all request
app.use('/api',router);
app.get('/',(req,res)=>{
    res.send('just for testing')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is up and running on port number ${process.env.PORT}!`);
   
})