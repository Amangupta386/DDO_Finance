const { DataTypes } = require('sequelize');
const { sequelize2 } = require('../../config/db'); // Adjust the path as needed

const WTT_PaymentTerm = sequelize2.define('WTT_PaymentTerm', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  // Add other fields as needed
}, {
  // Define the table name (optional)
  tableName: 'WTT_PaymentTerm',
  // Other model configurations (timestamps, underscored, etc.)
});

module.exports = {
  WTT_PaymentTerm,
  sequelize2
};
