// All imports that are used below
import mongoose from "mongoose";
import optionModel from "../config/optionSchema.js";
import questionModel from "../config/questionSchema.js";

export class PollingModel{
  // function for creating a question
    static async saveData(data){
        try{
            // creating a new question 
            const create = new questionModel({title:data.title            
            });
            // saving the data in the database
            await create.save();
            return{
                msg:"question is created",
                details:create,
                success:true
            }
        }catch(err){
            // if some error is faced 
            return{
                success:false,
                msg:"Something went wrong Question is not created!",
                error:err,
            }
        }
        }


        // function for saving a option
        static async saveoption(data,id){
         
            try{
                // destrutcring the element from the data
            const {text,votes}=data;
            // getting the question in which option is included
            const getelement = await questionModel.findById({_id:id});
            if(getelement){
            if(typeof votes===undefined){
                votes = 0;
            }
            //  check if option is already created 
            const result = await optionModel.findOne({text:text});
            if(result){
                // if created then return
                return{
                    success:false,
                    msg:"option already exist"
                }
            }else{
                // new option is created
            const createoption = new optionModel({text:text,
                votes:votes,
                question_id:id
            })
            await createoption.save();
            // saving the data in the option array
           await getelement.options.push(createoption);
           await getelement.save();
           return {
            success:true,
            msg:'option is created',
            details:getelement
        
         }
        }
        }else{
            // if wrong id is passed
            return {
                success:false,
                msg:"Id is wrong please try again",
                details:getelement
            }
         }

        }catch(err){
            return{
                success:false,
                msg:"Option is not deleted, something went wrong!",
                error:err
            }
        }
    }
    // for deleting a question
    static async deleteQuestion(id){
        try{
            // finding the specific question
        const search = await questionModel.findById({_id:id});
        // checking if vote is given in any option
         const condition = search.options.some((element)=>{
           return element.votes!=0;
        })
        // If vote is given in any option then the question is not deleted
        if(condition){
            return{
                success:false,
                msg:"this question is not deleted!"
            }
        }else{
            // if vote is not given in any option then option is deleted
        await search.deleteOne();
        // finding all the option related to the given question 
        const option = await optionModel.find({question_id:id.toString()});
        if (option.length > 0) {
            // deleting all the options
            await optionModel.deleteMany({ question_id: id.toString() });
            
        } else {
            // if option not found 
        return{
            success:false,
            msg:"no option is found!"
        }
        }
        // getting all data again after deleting the question
        const allcollection = await questionModel.find();
         if(search){
            return{
                msg:"Question is deleted",
                success:true,
                data:allcollection
            }
         }else{
            return{
                success:false,
                result:search,
                msg:"Question id is incorect/something went wrong please try again"
            }
         }
        }
        }catch(err){
            return{
                error:err,
                msg:"something went wrong please try again!"
            }
        }
    }
    // function for deleting the option from the database
       static async deleteOptions(id) {
        try {
            // finding the option on the basis of the id
            const optionToDelete = await optionModel.findById(id);
     if (!optionToDelete) {
        // if someting wrong with the id
                return {
                    success: false,
                    msg: "Option not found with the provided ID",
                };
            }
            // checking for any votes
            if(optionToDelete.votes!=0){
                return{
                    success:false,
                    msg:"This option is not deleted!"
                }
            }else{
                // if no voted then option is deleting from the option model as well as question model
            const questionId = optionToDelete.question_id;
            // finding the question id for deleting a specific option
            const question = await questionModel.findById(questionId);
            if (!question) {
                return {
                    success: false,
                    msg: "Question not found with the provided ID",
                };
            }
            // finding the specifc option from the options Array of the question
            const index = question.options.findIndex((opt) => opt._id.equals(id));
            // if index is not found
            if (index === -1) {
                return {
                    success: false,
                    msg: "Option not found in the question's options array",
                };
            }
            // if option is found then deleting the specific option
            question.options.splice(index, 1);
            await question.save();
            await optionToDelete.deleteOne();
            return {
                success: true,
                msg: "Option deleted successfully",
                data: question,
            };
        }
        } catch (err) {
            return {
                success: false,
                msg: "An error occurred while deleting the option",
                error: err,
            };
        }
    }
    // function for getting a specific question
      static async getByIdguesion(id){
        try{
            // finding the specific option from the database
        const get = await questionModel.findById({_id:id});
        if(get){
            // if option is found
            return{
                data:get,
                msg:"request is completed",
                success:true
            }
        }else{
            // if option is not found
            return{
                success:false,
                msg:"request is not completed/ id is incorrect please try again"
            }
        }
    }catch(err){
        return{
            error:err,
            success:false
        }
    }
      }
      // function for voting
      static async forVote(id,url){
        try{
      // finding the option in which vote is given
        const optionVote = await optionModel.findById({_id:id});
      // if option is not found
        if(!optionVote){
            return{
                success:false,
                msg:"not found"
            }
        }else{
            // checking for link
            if(typeof optionVote.link_to_vote==="undefined"){
            optionVote.link_to_vote = url;
            }
            // increasing the value of the vote
          let increvalue = optionVote.votes+1;
          optionVote.votes = increvalue;
          await optionVote.save();
          const updated = await optionModel.findById({_id:id});
          const qid = optionVote.question_id;
          // finding the question for incrementing the value of bote in a specifv option of the question
          const voteupinQ = await questionModel.findById({_id:qid});
          // if question is not found
          if(!voteupinQ){
            return{
                success:false,
                msg:"Question not found"
            }
          }else{
            // finding the option in which value of vote to be increased
            const index = await voteupinQ.options.findIndex((opt) => opt._id.equals(id));
            // if no such option is found
            if (index === -1) {
                return {
                    success: false,
                    msg: "Option not found in the question's options array",
                };
            }
            // if option is found then increasing the value of the vote
            else{
                voteupinQ.options[index] = updated;
                await voteupinQ.save()
            }
          }
          
            const updateresult = await questionModel.findById({_id:qid});
            return {
                success:true,
                data:updateresult
            }
            
        }
      }catch(err){
        return{
        success:true,
        msg:'vote is not created',
        error:err
        }
      }
    }
    }

   