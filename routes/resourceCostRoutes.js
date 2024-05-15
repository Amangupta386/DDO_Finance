// routes/items.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
// const projectController = require('../controllers/project');
const resourceCostController = require('../controllers/database1/resourceCostController');
const wttEmp_empCostController = require('../controllers/combine/wttEmp_empCostController');


router.route('/')
    // Create or Update Resource Cost
    // .post(resourceCostController.createResourceCost)
    .post(resourceCostController.handleMutipleObjects)
    // Get All employee with cost
    // .get(resourceCostController.getAllResourceCosts);
    // Get All employee with cost and Name
    .get(wttEmp_empCostController.getAllResourceCostWithNames)
    .put(resourceCostController.updateResourceCost);

router.route('/upload')
      .post(upload.single('file'),wttEmp_empCostController.uploadExcel);  

router.route('/:id')
    // Read one project by ID    
    .get(resourceCostController.getResourceCostById)
    // Update a project by ID
    // .put(resourceCostController.updateResourceCost);
    // Delete a project by ID
    // .delete(resourceCostController.deleteResourceCost);




module.exports = router;
