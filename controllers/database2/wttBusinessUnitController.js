// controllers/WTTProjectController.js
const { WTTBusinessUnit } = require('../../models/database2/wtt_businessUnit');

// Create a new WTT Business Unit record
exports.createWTTBusinessUnit = async (req, res) => {
  try {
    const { name, BU_Owner } = req.body;
    const wttBusinessUnit = await WTTBusinessUnit.create({ name, BU_Owner });
    return res.status(201).json(wttBusinessUnit);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get all WTT Business Units
exports.getAllWTTBusinessUnits = async (req, res) => {
  try {
    const wttBusinessUnits = await WTTBusinessUnit.findAll({
      order: [
        ['id', 'ASC'], // Order by id in ascending order
      ],
    });    
    return res.status(200).json(wttBusinessUnits);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllWTTBusinessUnits2 = async (req, res) => {
  try {
    const wttBusinessUnits = await WTTBusinessUnit.findAll();
    return wttBusinessUnits;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get WTT Business Unit by ID
exports.getWTTBusinessUnitById = async (req, res) => {
  try {
    const wttBusinessUnit = await WTTBusinessUnit.findByPk(req.params.id);
    if (!wttBusinessUnit) {
      return res.status(404).json({ message: 'WTT Business Unit not found' });
    }
    return res.status(200).json(wttBusinessUnit);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update WTT Business Unit by ID
exports.updateWTTBusinessUnitById = async (req, res) => {
  try {
    const { name, BU_Owner } = req.body;
    const updatedRows = await WTTBusinessUnit.update({ name, BU_Owner }, {
      where: { id: req.params.id },
    });
    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: 'WTT Business Unit not found' });
    }
    return res.status(200).json({ message: 'WTT Business Unit updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete WTT Business Unit by ID
exports.deleteWTTBusinessUnitById = async (req, res) => {
  try {
    const deletedRowCount = await WTTBusinessUnit.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ message: 'WTT Business Unit not found' });
    }
    return res.status(200).json({ message: 'WTT Business Unit deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
