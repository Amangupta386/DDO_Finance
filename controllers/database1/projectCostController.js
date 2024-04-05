const { ProjectCosts, sequelize } = require('../../models/database1/projectcost'); // Import your ProjectCost model
const { validationResult } = require('express-validator');
const { FinancialYear } = require('../../models/database1/financialYear');

// Create a new ProjectCost record
exports.createProjectCost = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { FK_FinancialYear_ID, FK_WTT_Project_ID, forecast, actual, projectStatus } = req.body;

    // Create a new ProjectCost record
    const projectCost = await ProjectCosts.create({
      FK_FinancialYear_ID,
      FK_WTT_Project_ID,
      forecast,
      actual,
      projectStatus
    });

    return res.status(201).json(projectCost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Retrieve all ProjectCost records
exports.getAllProjectCosts = async (req, res) => {
  try {
    const projectCosts = await ProjectCosts.findAll({
      include: [
        {
          model: FinancialYear,
          as: 'financialYear', // This should match the alias you defined in your association
          attributes: ['name'], // Include only the 'name' field from FinancialYear
        },
      ],
    });
    return res.status(200).json(projectCosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Retrieve all ProjectCost records
exports.getAllProjectCosts2 = async (req, res) => {
  try {
    const projectCosts = await ProjectCosts.findAll();
    return projectCosts;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Retrieve a single ProjectCost record by ID
exports.getProjectCostById = async (req, res) => {
  try {
    const projectCost = await ProjectCosts.findByPk(req.params.id);

    if (!projectCost) {
      return res.status(404).json({ message: 'ProjectCost not found' });
    }

    return res.json(projectCost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update a ProjectCost record by ID
exports.updateProjectCostById = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { FK_FinancialYear_ID, FK_WTT_Project_ID, forecast, actual, projectStatus } = req.body;

    const projectCost = await ProjectCosts.findByPk(req.params.id);

    if (!projectCost) {
      return res.status(404).json({ message: 'ProjectCost not found' });
    }

    // Update the ProjectCost record
    projectCost.FK_FinancialYear_ID = FK_FinancialYear_ID;
    projectCost.FK_WTT_Project_ID = FK_WTT_Project_ID;
    projectCost.forecast = forecast;
    projectCost.actual = actual;
    projectCost.projectStatus = projectStatus;

    await projectCost.save();

    return res.json(projectCost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a ProjectCost record by ID
exports.deleteProjectCostById = async (req, res) => {
  try {
    const projectCost = await ProjectCosts.findByPk(req.params.id);

    if (!projectCost) {
      return res.status(404).json({ message: 'ProjectCost not found' });
    }

    await projectCost.destroy();

    return res.status(204).end(); // No content response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

  