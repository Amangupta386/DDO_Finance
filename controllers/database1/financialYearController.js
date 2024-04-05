const { FinancialYear } = require('../../models/database1/financialYear'); 
const { validationResult } = require('express-validator');

// Create a new FinancialYear record
exports.createFinancialYear = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, startDate, endDate, createdBy } = req.body;

    // Create a new FinancialYear record
    const financialYear = await FinancialYear.create({
      name,
      startDate,
      endDate,
      createdBy
    });

    return res.status(201).json(financialYear);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Retrieve all FinancialYear records
exports.getAllFinancialYears = async (req, res) => {
  try {
    const financialYears = await FinancialYear.findAll();
    res.status(200).json(financialYears);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Retrieve all FinancialYear records
exports.getAllFinancialYears2 = async (req, res) => {
  try {
    const financialYears = await FinancialYear.findAll();
    return financialYears;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Retrieve a single FinancialYear record by ID
exports.getFinancialYearById = async (req, res) => {
  try {
    const financialYear = await FinancialYear.findByPk(req.params.id);

    if (!financialYear) {
      return res.status(404).json({ message: 'FinancialYear not found' });
    }

    return res.json(financialYear);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update a FinancialYear record by ID
exports.updateFinancialYearById = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, startDate, endDate, createdBy, createdAt } = req.body;

    const financialYear = await FinancialYear.findByPk(req.params.id);

    if (!financialYear) {
      return res.status(404).json({ message: 'FinancialYear not found' });
    }

    // Update the FinancialYear record
    financialYear.name = name;
    financialYear.startDate = startDate;
    financialYear.endDate = endDate;
    financialYear.createdBy = createdBy;
    financialYear.createdAt = createdAt;

    await financialYear.save();

    return res.json(financialYear);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a FinancialYear record by ID
exports.deleteFinancialYearById = async (req, res) => {
  try {
    const financialYear = await FinancialYear.findByPk(req.params.id);

    if (!financialYear) {
      return res.status(404).json({ message: 'FinancialYear not found' });
    }

    await financialYear.destroy();

    return res.status(204).end(); // No content response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
