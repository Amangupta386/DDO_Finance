// controllers/WTTProjectController.js
const { WTTProject } = require('../../models/database2/wtt_project');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = await WTTProject.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create project' });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await WTTProject.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch projects' });
  }
};

exports.getAllProjects2 = async (clientId, buId) => {
  try {
    const filter = {
      isActive: 'true', 
     
    };
    clientId && (filter['FK_WTT_Customer_ID']=clientId);
    buId && (filter['FK_WTT_BusinessUnit_ID']=buId);
    const wttProjects = await WTTProject.findAll({
      order:[
        ['id','ASC']
       ],
      where: filter,
    });
    // Extract the dataValues and convert to a plain array
    const plainArray = wttProjects.map(project => project.dataValues);
    // Return the plain array in JSON format
    return plainArray;

  } catch (error) {
   throw Error('Unable to fetch projects');
  }
};

exports.getAllActiveProjectNames = async (req, res) => {
  try {
    const wttProjects = await WTTProject.findAll({
      attributes: ['id', 'name', 'FK_WTT_Customer_ID'],
    },{
      where: {
        isActive: 'true', 
      },
    });
    // Extract the dataValues and convert to a plain array
    const plainArray = wttProjects.map(project => project.dataValues);
    // Return the plain array in JSON format
    return plainArray;

  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch projects' });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await WTTProject.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch project' });
  }
};

// Update project by ID
exports.updateProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await WTTProject.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to update project' });
  }
};

// Delete project by ID
exports.deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await WTTProject.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete project' });
  }
};
