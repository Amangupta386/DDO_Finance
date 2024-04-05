// models/WTTProject.js

const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');

const User = sequelize.define('Users', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  } }, {
    sequelize,
    modelName: 'User',
});

// Define any associations or additional configurations here

module.exports = {
  User, // Export the model
  sequelize,      // Export the instance
};

