const { DataTypes } = require('sequelize');
const { sequelize2 } = require('../../config/db'); // Adjust the path as needed

const WTT_Currency = sequelize2.define('WTT_Currency', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  symbol: {
    type: DataTypes.STRING(255),
  },
  INR_Equivalent: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.STRING(255),
  },
  // Add other fields as needed
}, {
  // Define table name (optional, it will default to 'WTT_Currencies' based on the model name)
  tableName: 'WTT_Currency',
  // Other model configurations (timestamps, underscored, etc.)
});

module.exports = {
  WTT_Currency,
  sequelize2
};
