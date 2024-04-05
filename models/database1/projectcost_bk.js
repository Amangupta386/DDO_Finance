'use strict';
const { WTTProject } = require('../database2/wtt_project'); 
const {
  Model 
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class ProjectCost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the association with WTTProject      
      this.belongsTo(WTTProject, {
        foreignKey: 'FK_WTT_Project_ID', // Name of the foreign key in ProjectCost table
        as: 'project', // Alias to use when accessing the associated project
      });
    }
  }
  ProjectCost.init({
    FK_WTT_Project_ID: DataTypes.INTEGER,
    forecast: DataTypes.BIGINT,
    actual: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'ProjectCost',
  });
  return ProjectCost;
};