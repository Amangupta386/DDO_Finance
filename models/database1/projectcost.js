// models/WTTProject.js

const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const { FinancialYear } = require('./financialYear');

const ProjectCosts = sequelize.define('ProjectCosts', {
    FK_FinancialYear_ID: DataTypes.INTEGER,
    FK_WTT_Project_ID: DataTypes.INTEGER,
    forecast: DataTypes.BIGINT,
    actual: DataTypes.BIGINT,
    projectStatus: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ProjectCost',
});

// Define the association
ProjectCosts.belongsTo(FinancialYear, {
  foreignKey: 'FK_FinancialYear_ID',
  as: 'financialYear',
});

module.exports = {
  ProjectCosts, // Export the model
  sequelize        // Export the instance
};

