import mongoose from "mongoose";
// Schema for option
const optionSchema = mongoose.Schema({
    text:{type:String,required:true},
    votes:{type:Number,default:0},
    link_to_vote:{type:String},
    question_id:{type:String,required:true}
})
// option model
const optionModel = mongoose.model('options',optionSchema);

export default optionModel;