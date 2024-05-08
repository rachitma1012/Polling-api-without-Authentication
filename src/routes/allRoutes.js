// all imports that are necessary
import express from 'express';
import { PollingController } from '../controller/polling.controller.js';
// routes configuration
const router = express.Router();
const pollingcontroller = new PollingController(); 
// route for creating a question
router.post('/questions/create',pollingcontroller.saveData);
// route for creating an option
router.post('/questions/:id/options/create',pollingcontroller.saveoption);
// route for deleting an questions
router.delete('/questions/:id/delete',pollingcontroller.deletQuestion);
// route for deleting an option
router.delete('/options/:id/delete',pollingcontroller.deleteOption);
// route for getting a specific question
router.get('/questions/:id',pollingcontroller.specificQuestions);
// route for voting
router.put('/options/:id/add_vote',pollingcontroller.vote)
export default router;