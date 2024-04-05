// Import Sequelize
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

// Define the ExpenseCategories model
const ExpenseCategories = sequelize.define('ExpenseCategories', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull: {
            msg: 'Name is required',
        },
        len: {
            args: [3, 255], // Minimum and maximum length
            msg: 'Name must be between 3 and 255 characters',
        },
    },
  },
  parentId: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdById: {
    type: DataTypes.BIGINT,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedById: {
    type: DataTypes.BIGINT,
  },
}, {
  tableName: 'ExpenseCategories',
  timestamps: false, // If you want Sequelize to manage createdAt and updatedAt automatically
});

// You can add any additional configurations or associations here

// Export the model
module.exports = {
    ExpenseCategories,
    sequelize, 
  };
