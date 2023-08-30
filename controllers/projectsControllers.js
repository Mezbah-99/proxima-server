const mongoose = require('mongoose');
const Project = require('../models/projectsModels');

// Get all products
const getAllprojects =  async (req, res) => {

    const user_id = req.user._id;

    try {
        const data = await Project.find({user_id}).sort({createdAt: -1}); // Decending, newly added project on top (lifo)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
// Get single Products
const getSingleProjects =  async (req, res) => {
    const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id!"})
     }
    const project = await Project.findById(id);
    if(!project){
        return res.status(404).json({error: "Something went wrong!"})
    }
    res.status(200).json(project);
    
}
// Post a new projects
const postNewProjects = async (req, res) => {
   
    const user_id = req.user._id;

    try {
        const project = await Project.create({
            ...req.body,
            user_id
        })
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// delete a projects
const deleteProjects = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error: "Invalid id!"})
    }
    const project = await Project.findOneAndDelete({_id: id})
    if(!project){
        res.status(400).json({error: "No project found!"})
    }
    res.status(200).json({project, message: "Deleted this projects."})
}
// patch a projects
const patchProjects = async (req, res) => {
    const {id} = req.params;
    const {title, tech, budget, duration, manager, dev} = req.body;

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!tech){
        emptyFields.push('tech')
    }
    if(!budget){
        emptyFields.push('budget')
    }
    if(!duration){
        emptyFields.push('duration')
    }
    if(!manager){
        emptyFields.push('manager')
    }
    if(!dev){
        emptyFields.push('dev')
    }


    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please Fill in all fields.", emptyFields});
    }
    
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error: "Invalid id!"})
    }
    const project = await Project.findOneAndUpdate(
        {_id: id},
        {...req.body},
        { new: true } // update value dekhar jonno  new: true bebohar kora hoy
    );
    if(!project){
        res.status(400).json({error: "No project found!"})
    }
    res.status(200).json({project, message: "updated this projects."})
}

module.exports = {
    getAllprojects, getSingleProjects, postNewProjects, deleteProjects, patchProjects
}


