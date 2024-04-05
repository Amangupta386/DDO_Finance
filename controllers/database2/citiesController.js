const { WTT_Cities } = require('../../models/database2/wtt_cities');

// Create a new city
const createCity = async (req, res) => {
  try {
    const city = await WTT_Cities.create(req.body);
    res.status(201).json(city);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating city' });
  }
};

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await WTT_Cities.findAll();
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching cities' });
  }
};

// Get a city by ID
const getCityById = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await WTT_Cities.findByPk(id);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching city' });
  }
};

// Update a city
const updateCity = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await WTT_Cities.update(req.body, {
      where: { id },
    });
    if (updated) {
      res.json({ message: 'City updated successfully' });
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating city' });
  }
};

// Delete a city
const deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await WTT_Cities.destroy({
      where: { id },
    });
    if (deleted) {
      res.json({ message: 'City deleted successfully' });
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting city' });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
