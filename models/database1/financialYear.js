const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const FinancialYear = sequelize.define('FinancialYears', {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required',
      },
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Start Date is required',
      },
    },
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'End Date is required',
      },
    },
  },
  createdBy: {
    type: DataTypes.BIGINT,
  }
});

// Define any associations or additional configurations here

module.exports = {
  FinancialYear,
  sequelize, 
};

