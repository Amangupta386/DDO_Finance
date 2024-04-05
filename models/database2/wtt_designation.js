const { DataTypes } = require('sequelize');
const { sequelize2 } = require('../../config/db');

const Designation = sequelize2.define('Designation', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required',
      },
    },
  },
  isActive: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize2,
  tableName: 'designation',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  //   underscored: true, // we use this when we want to convert camel to snake casing
});

module.exports = Designation;
