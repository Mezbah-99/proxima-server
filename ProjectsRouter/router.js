const express = require('express');
const router = express.Router();
const { getAllprojects, getSingleProjects, postNewProjects, deleteProjects, patchProjects } = require('../controllers/projectsControllers');

// Get all products
router.get('/', getAllprojects)
// Get single Products
router.get('/:id', getSingleProjects)
//Post a new projects
router.post('/', postNewProjects)
// Delete a project
router.delete('/:id', deleteProjects)
// update a project 
router.patch('/:id', patchProjects)
module.exports = router;

