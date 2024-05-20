const { DataTypes, Sequelize } = require('sequelize');
const { sequelize2 } = require('../../config/db');
const { WTT_Employee } = require('./wtt_employee');

const WTT_ProjectResources = sequelize2.define('WTT_ProjectResources', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    sort: DataTypes.BIGINT,
    createdById: DataTypes.BIGINT,
    updatedById: DataTypes.BIGINT,
    FK_WTT_Project_ID: DataTypes.BIGINT,
    FK_WTT_Employee_ID: {type: DataTypes.BIGINT, references: {model:WTT_Employee}},
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    allocPercent: DataTypes.BIGINT,
    isActive: { type: DataTypes.STRING, defaultValue: 'true' },
    description: DataTypes.TEXT,
    FK_WTT_ProjectResources_ID: DataTypes.BIGINT,
    resource: { type: DataTypes.STRING, defaultValue: 'true' },
    FK_WTT_ProjectRoles_ID: DataTypes.BIGINT,
    FK_RM_ID: DataTypes.BIGINT,
    FK_requestedBy: DataTypes.BIGINT,
  }, {
    tableName: 'WTT_ProjectResources',
    timestamps: false, // Set to true if you want Sequelize to manage timestamps
  });

  // Define any associations or additional configurations here
  WTT_ProjectResources.belongsTo(WTT_Employee, { foreignKey: 'FK_WTT_Employee_ID', as: 'Employee' });
module.exports = {
    WTT_ProjectResources, // Export the model
    sequelize2, // Export the instance
};
  