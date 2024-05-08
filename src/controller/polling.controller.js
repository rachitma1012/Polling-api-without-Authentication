// all imports that are necessary
import { PollingModel } from "../model/polling.model.js";


export class PollingController{
    // controller function for creating a question
    async saveData(req,res){
        const get = await PollingModel.saveData(req.body);
        res.status(201).json(get);
    }
    // controller function for creating an option
    async saveoption(req,res){
        const result = await PollingModel.saveoption(req.body,req.params.id);
        res.status(201).json(result);
    }
    // controller function for deleting an question
    async deletQuestion(req,res){
        const id = req.params.id
        const result = await PollingModel.deleteQuestion(id);
        res.json(result);
    }
      // controller function for deleting an option
    async deleteOption(req,res){
        const id = req.params.id;
        const result = await PollingModel.deleteOptions(id);
        res.json(result);
    }
    // controller function for getting an specific questions
    async specificQuestions(req,res){
        const id = req.params.id;
       const result = await PollingModel.getByIdguesion(id);
       res.json(result); 
    }
    // controller function for voting
    async vote(req,res){
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const id = req.params.id;
        const result = await PollingModel.forVote(id,fullUrl);
        res.json(result);
    }
}