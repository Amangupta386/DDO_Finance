// models/ResourceCostActualBreakdownByMonth.js
const { DataTypes } = require('sequelize');
const { sequelize }= require('../../config/db'); // Adjust the path based on your project structure

const ResourceCostActualBreakdownByMonth = sequelize.define('ResourceCostActualBreakdownByMonth', {

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
  FK_FinancialYear_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  FK_WTT_Project_ID: {
    type: DataTypes.BIGINT,
  },
  FK_WTT_Employee_ID: {
    type: DataTypes.BIGINT,
  },
  // Monthly breakdowns
  april: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for April',
  },
  aprilComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  may: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for May',
  },
  mayComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  june: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for June',
  },
  juneComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  july: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for July',
  },
  julyComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  august: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for August',
  },
  augustComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  september: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for September',
  },
  septemberComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  october: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for October',
  },
  octoberComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  november: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for November',
  },
  novemberComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  december: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for December',
  },
  decemberComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  january: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for January',
  },
  januaryComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  february: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for February',
  },
  februaryComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  march: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: 'Value for March',
  },
  marchComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'ResourceCostActualBreakdownByMonth',
  timestamps: false,
});

module.exports = {
    ResourceCostActualBreakdownByMonth,
    sequelize, 
  };
  