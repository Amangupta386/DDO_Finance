const { Project } = require('../models/index');

// Create an Project
const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read one Project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    ('Console Log Proj: ', project);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an Project by ID
const updateProjectById = async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProject = await Project.findByPk(req.params.id);
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an Project by ID
const deleteProjectById = async (req, res) => {
  try {
    const deleted = await Project.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { 
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
};