// routes/items.js
const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/project');
const citiesController = require('../controllers/database2/citiesController');


router.route('/')
    // Create a project
    .post(citiesController.createCity)
    // Update a project
    .get(citiesController.getAllCities);

router.route('/:id')
    // Read one project by ID    
    .get(citiesController.getCityById)
    // Update a project by ID
    .put(citiesController.updateCity);
    // Delete a project by ID
    // .delete(citiesController.deleteCity);

module.exports = router;
