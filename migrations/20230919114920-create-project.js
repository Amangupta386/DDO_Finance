'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fkFinancialYearId: {
        type: Sequelize.INTEGER
      },
      fkClientId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      fkCountryId: {
        type: Sequelize.INTEGER
      },
      fkCurrencyId: {
        type: Sequelize.INTEGER
      },
      fkPaymentId: {
        type: Sequelize.INTEGER
      },
      fkBusinessUnitId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};