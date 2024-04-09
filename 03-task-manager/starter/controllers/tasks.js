const mongoose = require('mongoose');
const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper( async (req, res) => {    
    const tasks = await Task.find({});
    res.status(200).json({tasks});
    // res.status(200).json({tasks, amount: tasks.length});
    // res.status(200).json({status: "success", data: {tasks,nbHits: tasks.length} });     
})

const createTask = asyncWrapper(async(req, res, done) => {   
    const task = await Task.create(req.body);
    res.status(201).json({task});    
})

const getTask = asyncWrapper(async (req, res, done) => {
    const { id: taskID } = req.params;

    if (!mongoose.isValidObjectId(taskID)) {
        return done(createCustomError("Invalid task id", 400));
    }
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return done(createCustomError(`No task with Id : ${taskID}`, 404));
    }
    res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, done) => {   
    const {id: taskID} = req.params;

    // Check if taskID is a valid Mongoose Object ID
    if (!mongoose.isValidObjectId(taskID)) {
        return done(createCustomError(`Invalid ID: ${taskID}`, 400));
    }
    const task= await Task.findOneAndDelete({_id: taskID}); 
    if(!task){
        return done(createCustomError(`No task with id: ${taskID}`, 404));
    }   
    res.status(200).json({task});
})

const updateTask = asyncWrapper(async (req, res, done) => {    
    const {id: taskID} = req.params;

    // Check if taskID is a valid Mongoose Object ID
    if (!mongoose.isValidObjectId(taskID)) {
        return done(createCustomError(`Invalid ID: ${taskID}`, 400));
    }
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    });
    if(!task){
        return done(createCustomError(`No task with id: ${taskID}`, 404));      
    }
    res.status(200).json({task});     
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    // editTask
}


//old code by video
//const getTask = asyncWrapper(async (req, res, done) => {   
//    const {id: taskID} = req.params;
//   const task = await Task.findOne({_id: taskID});
//    if(!task){
//       return done(createCustomError(`No task with id: ${taskID}`, 404));
//    }
//    res.status(200).json({task});   
//})

//const deleteTask = asyncWrapper( async (req, res, done) => {   
//    const {id: taskID} = req.params;
//    const task= await Task.findOneAndDelete({_id: taskID}); 
//    if(!task){
//        return done(createCustomError(`No task with id: ${taskID}`, 404));
//    }   
//   res.status(200).json({task});
    // res.status(200).send();
    // res.status(200).json({task:null, status: 'success' });
    
//})
// const editTask =  async (req, res) => {
//     try{
//         const {id: taskID} = req.params;
//          const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
//             new: true,
//             runValidators: true,
//             overwrite: true,
//         });
//         if(!task){
//             return res.status(404).json({msg: `No task with id: ${taskID}`});        
//         }
//         res.status(200).json({task});
//     }catch (error){
//         res.status(500).json({msg: error});
//     }  
// }