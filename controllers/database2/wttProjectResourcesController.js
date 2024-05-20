const { WTT_ProjectResources } = require('../../models/database2/wtt_projectresources');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { WTT_Employee } = require('../../models/database2/wtt_employee');
const { WTTProject } = require('../../models/database2/wtt_project');

// Validation rules for creating or updating a project resource
const projectResourceValidationRules = [
  body('FK_WTT_Project_ID').isInt(),
  body('FK_WTT_Employee_ID').isInt(),
  body('startDate').isISO8601().toDate(),
  body('endDate').isISO8601().toDate(),
  body('allocPercent').isInt({ min: 0, max: 100 }),
  body('isActive').isIn(['true', 'false']),
  body('resource').isIn(['true', 'false']),
  // Add more validation rules for other fields
];

// Create a project resource with validation
const createProjectResource = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const projectResource = await WTT_ProjectResources.create(req.body);
    res.status(201).json(projectResource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating project resource' });
  }
};

// Get a list of all project resources
const getAllProjectResources = async (req, res) => {
  try {
    const projectResources = await WTT_ProjectResources.findAll();
    res.json(projectResources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching project resources' });
  }
};

// Get a list of all project resources
const getAllAllocatedResources = async (startDateFilter, endDateFilter, res, isOnlyEndDateExp = false) => {
  try {
    const filter= {}; 
    if(+startDateFilter){
      const date = new Date(+startDateFilter); 
      date.setHours(0); 
      date.setMinutes(0);
      if(isOnlyEndDateExp)
      filter.endDate = {
        [Op.gte]: date,
      } 
      else
      filter.startDate = {
        [Op.gte]: date,
      }

    }
    if(+endDateFilter){
      const date = new Date(+endDateFilter); 
      date.setHours(0); 
      date.setMinutes(0);
      // filter.endDate = {
      //   [Op.lte]: date,
      // } 
      
    }else{
      filter.endDate = {
        [Op.gte]: new Date(),
      }
    }
    const projectResources = await WTT_ProjectResources.findAll({
      where:{
        ...filter,
        // endDate: {
        //   [Op.gte]:filter.endDate || new Date() // This checks if endDate is greater than or equal to the current date
        // }
      }
    });
    // Extract the dataValues and convert to a plain array
    const plainArray = projectResources.map(pr => pr.dataValues);
    return plainArray;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching project resources' });
  }
};

// Get a project resource by ID
const getProjectResourceById = async (req, res) => {
  const { id } = req.params;
  try {
    const projectResource = await WTT_ProjectResources.findByPk(id);
    if (projectResource) {
      res.json(projectResource);
    } else {
      res.status(404).json({ error: 'Project resource not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching project resource' });
  }
};

// Update a project resource with validation
const updateProjectResource = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const [updated] = await WTT_ProjectResources.update(req.body, {
      where: { id },
    });

    if (updated) {
      res.json({ message: 'Project resource updated successfully' });
    } else {
      res.status(404).json({ error: 'Project resource not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating project resource' });
  }
};

// Delete a project resource
const deleteProjectResource = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await WTT_ProjectResources.destroy({
      where: { id },
    });

    if (deleted) {
      res.json({ message: 'Project resource deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project resource not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting project resource' });
  }
};



module.exports = {
  projectResourceValidationRules,
  createProjectResource,
  getAllProjectResources,
  getProjectResourceById,
  updateProjectResource,
  deleteProjectResource,
  getAllAllocatedResources
  
};
