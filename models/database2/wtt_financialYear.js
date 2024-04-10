const { DataTypes, Sequelize } = require('sequelize');
const { sequelize2 } = require('../../config/db');

const WTT_FinancialYear = sequelize2.define('WTT_FinancialYear', {
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt'
    },
    sort: {
      type: DataTypes.BIGINT
    },
    createdById: {
      type: DataTypes.BIGINT,
      field: 'createdById'
    },
    updatedById: {
      type: DataTypes.BIGINT,
      field: 'updatedById'
    },
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'startDate'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'endDate'
    }
  }, {
    tableName: 'WTT_FinancialYear',
    timestamps: false, // if createdAt and updatedAt are managed by Sequelize
    underscored: true // to match the column naming style
  });
  
  module.exports = {
    WTT_FinancialYear,
  };
  
  