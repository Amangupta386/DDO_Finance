const { Sequelize } = require('sequelize');

// Load the database configuration from config.json
const config = require('./config.json');

// Select the appropriate configuration based on your environment (development, test, production)
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const environment2 = process.env.NODE_ENV || 'development2';
const dbConfig2 = config[environment2];

// Create a Sequelize instance using the selected configuration
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Create a Sequelize instance using the selected configuration
const sequelize2 = new Sequelize(
  dbConfig2.database,
  dbConfig2.username,
  dbConfig2.password,
  {
    host: dbConfig2.host,
    dialect: dbConfig2.dialect,
  }
);

module.exports = { 
  sequelize,
  sequelize2
};
