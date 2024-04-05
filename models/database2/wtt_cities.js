const { DataTypes, Sequelize } = require('sequelize');
const { sequelize2 } = require('../../config/db');

const WTT_Cities = sequelize2.define('WTT_Cities', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    sort: DataTypes.BIGINT,
    createdById: DataTypes.BIGINT,
    updatedById: DataTypes.BIGINT,
    city: DataTypes.STRING,
    FK_WTT_States_ID: DataTypes.BIGINT,
}, {
    tableName: 'WTT_Cities',
    timestamps: false, // If you don't want Sequelize to manage timestamps
});

module.exports = {
    WTT_Cities, // Export the model
    sequelize2, // Export the instance
  };