import mongoose from "mongoose";

// question Schema
const questionSchema = mongoose.Schema({
    title:{type:String,required:true},
    options:{type:Array,default:[]}
})
// question Model
const questionModel = mongoose.model('questions',questionSchema);

export default questionModel;