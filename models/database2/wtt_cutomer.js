const { DataTypes, Sequelize } = require('sequelize');
const { sequelize2 } = require('../../config/db');

const WTTCustomer = sequelize2.define('WTTCustomer', {
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
    allowNull: false,
    defaultValue: 'true',
  },
  POC_from_sales: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'WTT_Customer',
  schema: 'public'
}); 

// Define any associations or additional configurations here

module.exports = {
  WTTCustomer, // Export the model
  sequelize2, // Export the instance
};

