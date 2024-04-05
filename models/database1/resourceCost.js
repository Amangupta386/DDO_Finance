const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); // Make sure to adjust the path to your database configuration

const ResourceCost = sequelize.define('ResourceCost', {
  FK_WTT_Employee_ID: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  totalMonthlyCost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthlyCostComp1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthlyCostComp2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthlyCostComp3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthlyCostComp4: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdById: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  updatedById: {
    type: DataTypes.BIGINT,
  }
}, {
    tableName: 'ResourceCosts',
    timestamps: true, // If you don't want Sequelize to manage timestamps then set to false
});

// Synchronize the model with the database (create the table if it doesn't exist)
// ResourceCost.sync({ alter: true }); // You can use alter or force based on your needs

module.exports = {
  ResourceCost,
  sequelize
};
