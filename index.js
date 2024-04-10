require('dotenv').config();
const express = require('express'); 
const app = express();  
const cors = require('cors');
const { sequelize, sequelize2 } = require('./config/db'); 
const passport = require('./middleware/passport-config');
const authRoutes = require('./routes/authRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const paymentTermRoutes = require('./routes/paymentTermRoutes');
const projectRoute = require('./routes/projectRoutes');
const projectCostRoutes = require('./routes/projectCostRoutes');
const financialYearRoutes = require('./routes/financialYearRoutes');
const cityRoutes = require('./routes/cityRoutes');
const businessUnitRoutes = require('./routes/businessUnitRoutes');
const customerRoutes = require('./routes/customerRoutes');
const designationRoutes = require('./routes/designationRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const projectResourcesRoutes = require('./routes/projectResourcesRoutes');
const resourceCostRoutes = require('./routes/resourceCostRoutes');
const projectResourceCostRoutes = require('./routes/projectResourceCostRoutes');
const expenseCategoriesRoutes  = require('./routes/expenseCategoriesRoutes');
const resourceCostForecastBreakdownByMonthRoutes  = require('./routes/resourceCostForecastBreakdownByMonthRoutes');
const forecastedRevenueBreakdownByMonthRoutes = require('./routes/forecastedRevenueBreakdownByMonthRoutes');
const forecastedCollectionBreakdownByMonthRoutes = require('./routes/forecastedCollectionBreakdownByMonthRoutes');
const resourceCostActualBreakdownByMonthRoutes = require('./routes/resourceCostActualBreakdownByMonthRoutes');
const actualCollectionBreakdownByMonthRoutes = require('./routes/actualCollectionBreakdownByMonthRoutes');
const actualRevenueBreakdownByMonthRoutes = require('./routes/actualRevenueBreakdownByMonthRoutes');
const actualAndForecastedResource = require('./routes/resourceCostActualAndForecasted');
const otherExpensesBreakdownByMonthRoutes = require('./routes/otherExpensesBreakdownByMonthRoutes');

const { swaggerServe, swaggerSetup } = require("./apiDocs.js");


const { authenticateJWT } = require('./middleware/authMiddleware');

const port = process.env.PORT || 11000;

// Through this you can find the document in which it's tells about which API is used for which screen and What does it do.
// for server:- http://ddofinanceapi.walkingtree.tech/api-docs .
app.use("/api-docs", swaggerServe, swaggerSetup);

sequelize.sync() // Synchronize models with the database
  .then(() => {
    ('Database synchronization complete.');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  }); 

sequelize2.sync() // Synchronize models with the remote database
  .then(() => {
    ('Remote Database synchronization complete.');
  })
  .catch((err) => {
    console.error('Remote Error synchronizing database:', err);
  });   

app.use(cors())
app.use(express.json());
app.use(passport.initialize());
app.use('/', authRoutes); 
app.use(authenticateJWT);

// Protected route that requires authentication
app.use('/currency', currencyRoutes);
app.use('/paymentterm', paymentTermRoutes);
app.use('/project', projectRoute);
app.use('/projectcost', projectCostRoutes);
app.use('/financialyear', financialYearRoutes);
app.use('/city', cityRoutes);
app.use('/businessunit', businessUnitRoutes);
app.use('/customer', customerRoutes);
app.use('/designation', designationRoutes);
app.use('/employee', employeeRoutes);
app.use('/projectresources', projectResourcesRoutes);
app.use('/resourcecost', resourceCostRoutes);
app.use('/projectresourcescost', projectResourceCostRoutes);
app.use('/expenseCategories', expenseCategoriesRoutes);
app.use('/resourceCostForecastBreakdownByMonth', resourceCostForecastBreakdownByMonthRoutes);
app.use('/forecastedRevenueBreakdownByMonth', forecastedRevenueBreakdownByMonthRoutes);
app.use('/forecastedCollectionBreakdownByMonth', forecastedCollectionBreakdownByMonthRoutes);
app.use('/resourceCostActualBreakdownByMonth', resourceCostActualBreakdownByMonthRoutes);
app.use('/actualCollectionBreakdownByMonth', actualCollectionBreakdownByMonthRoutes);
app.use('/actualRevenueBreakdownByMonth', actualRevenueBreakdownByMonthRoutes);
app.use('/actualAndForecastedResource', actualAndForecastedResource);
app.use('/otherExpensesBreakdownByMonth', otherExpensesBreakdownByMonthRoutes);




app.listen(port, async () => {
  (`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    ('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// Add this at the end of your code
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
