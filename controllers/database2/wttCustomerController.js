const { WTTCustomer } = require('../../models/database2/wtt_cutomer'); 
const { validationResult } = require('express-validator');
const { WTTProject } = require('../../models/database2/wtt_project');

// Create a new WTT Customer record
exports.createWTTCustomer = async (req, res) => {
  try {
    const { name, description, isActive, POC_from_sales } = req.body;
    const wttCustomer = await WTTCustomer.create({
      name,
      description,
      isActive,
      POC_from_sales,
    });
    return res.status(201).json(wttCustomer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllWTTCustomers = async (req, res) => {
  try {
    let filter = {
      isActive: 'true',
    };

    const {buId} = req.query; // Extracting buId from request parameters

    if (buId) {
      // Add filter for business unit ID if provided
      const projects = await WTTProject.findAll({
        // attributes: ['FK_WTT_Customer_ID'],
        where: {
          FK_WTT_BusinessUnit_ID: buId,
        },
      });

      const customerIds = projects.map(project => project.FK_WTT_Customer_ID);
      filter.id = customerIds;
      console.log(filter);
    }

    const wttCustomers = await WTTCustomer.findAll({
      where: filter,
      order: [
        ['id', 'ASC'], // Order by id in ascending order
      ],
    });

    // Send the fetched customers as JSON response
    return res.status(200).json(wttCustomers);
  } catch (error) {
    console.error(error);
    // Send a 500 Internal Server Error response if an error occurs
   return res.status(500).send({ error: error });
  }
};



// // Get all WTT Customers
// exports.getAllWTTCustomers = async (req, res) => {
//   try {
//     const wttCustomers = await WTTCustomer.findAll({
//       order: [
//         ['id', 'ASC'], // Order by id in ascending order
//       ],
//     });
//     return res.status(200).json(wttCustomers);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server Error' });
//   }
// };

exports.getAllWTTCustomers2 = async (req, res) => {
  try {
    const wttCustomers = await WTTCustomer.findAll();

    // Extract the dataValues and convert to a plain array
    const plainArray = wttCustomers.map(customer => customer.dataValues);

    // Return the plain array in JSON format
    return plainArray;

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllActiveWTTCustomerNames = async (req, res) => {
  try {
    const wttCustomers = await WTTCustomer.findAll({
      attributes: ['id', 'name'],
    },{
      where: {
        isActive: 'true', 
      },
    });

    // Extract the dataValues and convert to a plain array
    const plainArray = wttCustomers.map(customer => customer.dataValues);

    // Return the plain array in JSON format
    return plainArray;

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Get WTT Customer by ID
exports.getWTTCustomerById = async (req, res) => {
  try {
    const wttCustomer = await WTTCustomer.findByPk(req.params.id);
    if (!wttCustomer) {
      return res.status(404).json({ message: 'WTT Customer not found' });
    }
    return res.status(200).json(wttCustomer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Update WTT Customer by ID
exports.updateWTTCustomerById = async (req, res) => {
  try {
    const { name, description, isActive, POC_from_sales } = req.body;
    const updatedRows = await WTTCustomer.update(
      {
        name,
        description,
        isActive,
        POC_from_sales,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: 'WTT Customer not found' });
    }
    return res.status(200).json({ message: 'WTT Customer updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Delete WTT Customer by ID
exports.deleteWTTCustomerById = async (req, res) => {
  try {
    const deletedRowCount = await WTTCustomer.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ message: 'WTT Customer not found' });
    }
    return res.status(200).json({ message: 'WTT Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
