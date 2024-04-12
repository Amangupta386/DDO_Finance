const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const OtherExpensesActualBreakdownByMonth = sequelize.define(
  'OtherExpensesActualBreakdownByMonth',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    sort: DataTypes.BIGINT,
    createdById: DataTypes.BIGINT,
    updatedById: DataTypes.BIGINT,
    FK_FinancialYear_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FK_WTT_Project_ID: DataTypes.BIGINT,
    FK_ExpenseCategory_ID: DataTypes.BIGINT,
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
    parentId: DataTypes.INTEGER, // Add parentId field
  },
  {
    tableName: 'OtherExpensesActualBreakdownByMonth',
    timestamps: false,
  }
);

module.exports = {
  OtherExpensesActualBreakdownByMonth,
  sequelize,
};
