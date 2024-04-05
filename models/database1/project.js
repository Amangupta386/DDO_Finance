'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    fkFinancialYearId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fkClientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fkCountryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fkCurrencyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fkPaymentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fkBusinessUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};