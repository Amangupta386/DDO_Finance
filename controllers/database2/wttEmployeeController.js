const { WTT_Employee } = require('../../models/database2/wtt_employee'); 
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

// Validation rules for creating or updating an employee
const employeeValidationRules = [
  body('firstName').isLength({ min: 3, max: 255 }),
  body('lastName').isLength({ min: 3, max: 255 }),
  body('EmployeeCode').isLength({ max: 255 }).custom(async (value, { req }) => {
    const employee = await WTT_Employee.findOne({
      where: {
        EmployeeCode: value,
        id: { [Op.not]: req.params.id },
      },
    });
    if (employee) {
      throw new Error('EmployeeCode already in use');
    }
    return true;
  }),
  // Add more validation rules for other fields
];

// Create an employee with validation
const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employee = await WTT_Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating employee' });
  }
};

// Get a list of all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await WTT_Employee.findAll({
      where: {
        IsActive: 'true', 
      },
    });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

// Get a list of all employees
const getAllEmployees2 = async (req, res) => {
  try {
    const employees = await WTT_Employee.findAll({
      where: {
        IsActive: 'true', 
      },
    });
    return employees;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

// Get a list of all employees with only specific fields
const getAllEmployeesOnlyCodeName = async (req, res) => {
  try {
    const employees = await WTT_Employee.findAll({
      attributes: ['id', 'EmployeeCode', 'FullName'],
    },{
      where: {
        IsActive: 'true', 
      },
    });
    return employees;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await WTT_Employee.findByPk(id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching employee' });
  }
};

// Update an employee with validation
const updateEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const [updated] = await WTT_Employee.update(req.body, {
      where: { id },
    });

    if (updated) {
      res.json({ message: 'Employee updated successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating employee' });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await WTT_Employee.destroy({
      where: { id },
    });

    if (deleted) {
      res.json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting employee' });
  }
};

module.exports = {
  employeeValidationRules,
  createEmployee,
  getAllEmployees,
  getAllEmployees2,
  getAllEmployeesOnlyCodeName,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

