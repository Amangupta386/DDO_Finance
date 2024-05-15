const { ResourceCost } = require('../../models/database1/resourceCost'); // Adjust the path as needed

// Create a new ResourceCost
exports.createResourceCost = async (req, res) => {
  try {    
    const newResourceCost = await ResourceCost.create(req.body);
    return res.status(201).json(newResourceCost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get all ResourceCost records
exports.getAllResourceCosts = async (req, res) => {
  try {
    const resourceCosts = await ResourceCost.findAll();
    return res.json(resourceCosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get all ResourceCost records
exports.getAllResourceCosts2 = async (req, res) => {
  try {
    const resourceCosts = await ResourceCost.findAll();
    // Extract the dataValues and convert to a plain array
    const plainArray = resourceCosts.map(rc => rc.dataValues);
    return plainArray;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get a specific ResourceCost by ID
exports.getResourceCostById = async (req, res) => {
  try {
    const resourceCost = await ResourceCost.findByPk(req.params.id);
    if (!resourceCost) {
      return res.status(404).json({ error: 'ResourceCost not found' });
    }
    return res.json(resourceCost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get a specific ResourceCost by employee ID
exports.getResourceCostByEmployeeId = async (req, res) => {
  try {
    const resourceCost = await ResourceCost.findOne({where: {FK_WTT_Employee_ID: req.params.id}});
    if (!resourceCost) {
      return res.status(404).json({ error: 'ResourceCost not found' });
    }
    // return res.json(resourceCost);
    return resourceCost;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update a ResourceCost by ID
exports.updateResourceCost = async (req, res) => {
  try {
    // Find the ResourceCost by ID and update it
    let resourceCost =  +req.query.id && await ResourceCost.findByPk(req.query.id);
    if (!resourceCost) {
      resourceCost =  await ResourceCost.create(req.body);
      return res.json(resourceCost);
    }
    await resourceCost.update(req.body);
    return res.json(resourceCost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a ResourceCost by ID
exports.deleteResourceCost = async (req, res) => {
  try {
    const resourceCost = await ResourceCost.findByPk(req.params.id);
    if (!resourceCost) {
      return res.status(404).json({ error: 'ResourceCost not found' });
    }
    await resourceCost.destroy();
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Endpoint to handle the Array of objects by POST or PUT method
exports.handleMutipleObjects = async (req, res) => {
  const results = [];
  let resultOfPut = '';
  let resultOfPost = '';  
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Request body should be an array of objects' });
  }

  for (const item of req.body) {
    if (item.id === 'N/A') {
      // This is a POST request
      
      try {    
        const newResourceCost = await ResourceCost.create({
           "FK_WTT_Employee_ID": item.FK_WTT_Employee_ID,
           "monthlyCostComp1": item.monthlyCostComp1,
           "monthlyCostComp2": item.monthlyCostComp2,
           "monthlyCostComp3": item.monthlyCostComp3,
           "monthlyCostComp4": item.monthlyCostComp4,
           "createdById": item.createdById,
           "updatedById": item.updatedById
        });
        resultOfPost = newResourceCost;
      } catch (error) {
        console.error(error);
        resultOfPost = error;
      }
      results.push(resultOfPost);
      // results.push({ message: 'POST request handled' });
    } else {
      // This is a PUT request
      const resourceCost = await ResourceCost.findByPk(item.id);
      if (!resourceCost) {
        return res.status(404).json({ error: 'ResourceCost not found' });
      }
      await resourceCost.update(item);
      //return res.json(resourceCost);
      resultOfPut = resourceCost;
      results.push(resultOfPut);
      //results.push({ message: 'PUT request handled' });
    }
  }
  res.json(results);
};
