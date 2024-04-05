const Designation = require('../../models/database2/wtt_designation'); 

// Create a new designation
exports.createDesignation = async (req, res) => {
  try {
    const newDesignation = await Designation.create(req.body);
    return res.status(201).json(newDesignation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get all designations
exports.getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll();
    return res.status(200).json(designations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get all designations
exports.getAllDesignations2 = async (req, res) => {
    try {
      const designations = await Designation.findAll();
      return designations;
    } catch (error) {
      console.error(error);
      return error;
    }
};

// Get a single designation by ID
exports.getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation) {
      return res.status(404).json({ error: 'Designation not found' });
    }
    return res.status(200).json(designation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update a designation by ID
exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation) {
      return res.status(404).json({ error: 'Designation not found' });
    }
    await designation.update(req.body);
    return res.status(200).json(designation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a designation by ID
exports.deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation) {
      return res.status(404).json({ error: 'Designation not found' });
    }
    await designation.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
