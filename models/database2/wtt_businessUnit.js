const { DataTypes, Sequelize } = require('sequelize');
const { sequelize2 } = require('../../config/db');

const WTTBusinessUnit = sequelize2.define('WTTBusinessUnit', {
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sort: {
    type: DataTypes.BIGINT,
  },
  createdById: {
    type: DataTypes.BIGINT,
  },
  updatedById: {
    type: DataTypes.BIGINT,
  },
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BU_Owner: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'true',
  },
}, {
  tableName: 'WTT_BusinessUnit',
  timestamps: false, // Set this to true if you want Sequelize to manage createdAt and updatedAt columns.
});

// Define any associations or additional configurations here

module.exports = {
  WTTBusinessUnit, // Export the model
  sequelize2, // Export the instance
};

