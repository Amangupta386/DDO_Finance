// models/WTTProject.js

const { DataTypes, Sequelize } = require('sequelize');
const { sequelize2 } = require('../../config/db');

const WTTProject = sequelize2.define('WTT_Project', {
  sort: {
    type: DataTypes.BIGINT,
  },
  createdById: {
    type: DataTypes.BIGINT,
  },
  updatedById: {
    type: DataTypes.BIGINT,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  isActive: {
    type: DataTypes.STRING,
    defaultValue: 'true',
  },
  locationCity: {
    type: DataTypes.STRING,
  },
  locationCountry: {
    type: DataTypes.STRING,
  },
  POC_name: {
    type: DataTypes.STRING,
  },
  POC_number: {
    type: DataTypes.STRING,
  },
  POC_Invoice: {
    type: DataTypes.TEXT,
  },
  POC_Legal: {
    type: DataTypes.TEXT,
  },
  projectType: {
    type: DataTypes.STRING,
  },
  FK_WTT_PaymentTerm_ID: {
    type: DataTypes.BIGINT,
  },
  FK_WTT_Currency_ID: {
    type: DataTypes.BIGINT,
  },
  phase: {
    type: DataTypes.STRING,
  },
  FK_WTT_Customer_ID: {
    type: DataTypes.BIGINT,
  },
  FK_WTT_BusinessUnit_ID: {
    type: DataTypes.BIGINT,
  },
  purchaseOrder: {
    type: DataTypes.STRING,
  },
  POC_email: {
    type: DataTypes.STRING,
  },
  sowEndDate: {
    type: DataTypes.STRING,
  },
},{
  tableName: 'WTT_Project',
  schema: 'public', 
});

// Define any associations or additional configurations here

module.exports = {
  WTTProject, // Export the model
  sequelize2, // Export the instance
};

