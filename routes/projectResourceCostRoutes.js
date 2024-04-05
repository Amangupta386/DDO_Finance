// routes/items.js
const express = require('express');
const router = express.Router();
const wttEmp_resourceCostController = require('../controllers/combine/wttEmp_resourceCostController');


router.route('/')
    // Get All Allocated Resouce COst
    .get(wttEmp_resourceCostController.getAllAllocatedResourceCost);

router.route('/:id')
    // Read one project by ID    
    // .get(wttEmp_resourceCostController.getProjectResourceById)

module.exports = router;
