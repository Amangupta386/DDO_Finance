const financialYearController = require('../database1/financialYearController');
const wttCustomerController = require('../database2/wttCustomerController');
const projectCostController = require('../database1/projectCostController');
const WTTProjectController = require('../database2/WTTProjectController');
const currencyController = require('../database2/currencyController');
const paymentTermController = require('../database2/paymentTermController');
const wttBusinessUnitController = require('../database2/wttBusinessUnitController');
const { formatRevenueRecord } = require('../database1/forecastedRevenueBreakdownByMonthController');

const getAllProjectsCostWithCorrespondingNames = async (req, res) => {
    try {
        const financialYear = await financialYearController.getAllFinancialYears2();
        const wttCustomers = await wttCustomerController.getAllWTTCustomers2();
        const wttProjects = await WTTProjectController.getAllProjects2();
        const projectsWithCost = await projectCostController.getAllProjectCosts2();
        const combinedData = [];
        for (let i = 0; i < projectsWithCost.length; i++) {
          const pc = projectsWithCost[i];
          // Find the associated Fyear
          const fyear = financialYear.find((fy) => parseInt(fy.id) === pc.FK_FinancialYear_ID);
          // Find the associated project
          const project = wttProjects.find((p) => parseInt(p.id) === pc.FK_WTT_Project_ID);
        
          if (project) {
            // If a project is found, continue to find the associated customer
            const customer = wttCustomers.find((c) => c.id === project.FK_WTT_Customer_ID);
            const whereClause = {
              FK_FinancialYear_ID: fyear.id,
            };
            if (projectId) {
              whereClause.FK_WTT_Project_ID = project.id;
            }
            const records = await ForecastedRevenueBreakdownByMonth.findOne({
              where: whereClause,
            });
            const formattedRecords = (formatRevenueRecord(records)).monthValues.reduce((t,d)=> t+d.value, 0);
        
            combinedData.push({
              id: pc.id,
              FK_FinancialYear_ID: pc.FK_FinancialYear_ID,
              financialYearName: fyear ? fyear.name : 'N/A',  
              FK_WTT_Customer_ID: customer ? customer.id : 'N/A',
              customerName: customer ? customer.name : 'N/A',
              FK_WTT_Project_ID: pc.FK_WTT_Project_ID,
              projectName: project.name,
              forecast: formattedRecords,
              actual: pc.actual,
              projectStatus: pc.projectStatus
              // Add other fields as needed...
            });
          } 
          else {
            // Handle the case where no matching project is found
            combinedData.push({
              id: pc.id,
              FK_FinancialYear_ID: pc.FK_FinancialYear_ID,
              financialYearName: fyear ? fyear.name : 'N/A',
              FK_WTT_Customer_ID: 'N/A',
              customerName: 'N/A', // Default value for customer name
              FK_WTT_Project_ID: pc.FK_WTT_Project_ID,
              projectName: 'N/A', // Default value for project name
              forecast: "0", // Default value for forecast
              actual: "0", // Default value for actual
              projectStatus: 'N/A'
              // Add other default values as needed...
            });
          }
          
        }
        return res.json(combinedData);

    }   catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }   
}

const getAllProjectsWithCorrespondingNames = async (req, res) => {
    try {
        const currencies = await currencyController.getAllCurrencies2();
        const paymentTerms = await paymentTermController.getAllPaymentTerms2();
        const businessUnits = await wttBusinessUnitController.getAllWTTBusinessUnits2();
        const wttCustomers = await wttCustomerController.getAllWTTCustomers2();
        const wttProjects = await WTTProjectController.getAllProjects2();

        const combinedData = wttProjects?.map((project) => {
            // Find the associated Customers
            const customer = wttCustomers.find((c) => c.id === project.FK_WTT_Customer_ID);
            // Find the associated BUs
            const businessUnit = businessUnits.find((bu) => bu.id === project.FK_WTT_BusinessUnit_ID);
            // Find the associated Payment Terms
            const paymentTerm = paymentTerms.find((fy) => fy.id === project.FK_WTT_PaymentTerm_ID);
            // Find the associated Payment Terms
            const currency = currencies.find((cu) => cu.id === project.FK_WTT_Currency_ID);
          
            if (project) {
              
              return {
                id: project.id,
                projectName: project.name,
                description: project.description,
                isActive: project.isActive,                
                locationCity: project.locationCity,                
                locationCountry: project.locationCountry,
                POC_name: project.POC_name,
                POC_number: project.POC_number,
                POC_Invoice: project.POC_Invoice,
                POC_Legal: project.POC_Legal,
                projectType: project.projectType,
                FK_WTT_PaymentTerm_ID: project.FK_WTT_PaymentTerm_ID,
                paymentTerm: paymentTerm ? paymentTerm.name : 'N/A',                
                FK_WTT_Currency_ID: project.FK_WTT_Currency_ID,
                currencyName: currency ? currency.name : 'N/A',
                currencySymbol: currency ? currency.symbol : 'N/A',
                phase: project.phase,
                FK_WTT_Customer_ID: project.FK_WTT_Customer_ID,
                customerName: customer ? customer.name : 'N/A',
                FK_WTT_BusinessUnit_ID: project.FK_WTT_BusinessUnit_ID,
                BU_Name: businessUnit ? businessUnit.name : 'N/A',
                BU_Owner: businessUnit ? businessUnit.BU_Owner : 'N/A',
                purchaseOrder: project.purchaseOrder,
                POC_email: project.POC_email,
              };
            } else {
              // Handle the case where no matching project is found
              return {
                id: project.id,
                projectName: project.name,
                description: project.description,
                isActive: project.isActive,                
                locationCity: project.locationCity,                
                locationCountry: project.locationCountry,
                POC_name: project.POC_name,
                POC_number: project.POC_number,
                POC_Invoice: project.POC_Invoice,
                POC_Legal: project.POC_Legal,
                projectType: project.projectType,
                FK_WTT_PaymentTerm_ID: project.FK_WTT_PaymentTerm_ID,
                paymentTerm: paymentTerm ? paymentTerm.name : 'N/A',                
                FK_WTT_Currency_ID: project.FK_WTT_Currency_ID,
                currencyName: currency ? currency.name : 'N/A',
                currencySymbol: currency ? currency.symbol : 'N/A',
                phase: project.phase,
                FK_WTT_Customer_ID: project.FK_WTT_Customer_ID,
                customerName: customer ? customer.name : 'N/A',
                FK_WTT_BusinessUnit_ID: project.FK_WTT_BusinessUnit_ID,
                BU_Name: businessUnit ? businessUnit.name : 'N/A',
                BU_Owner: businessUnit ? businessUnit.BU_Owner : 'N/A',
                purchaseOrder: project.purchaseOrder,
                POC_email: project.POC_email,
              };
            }
        });  
        return res.json(combinedData);

    }   catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }   
}


const getAllProjectsWithCorrespondingNameList = async (req, res) => {
  try {
      const {clientId, buId} = req.query;
      const wttProjects = await WTTProjectController.getAllProjects2(clientId, buId);

      const combinedData = wttProjects?.map((project) => {
        
          if (project) {
            
            return {
              id: project.id,
              projectName: project.name,
       
            };
          } else {
            // Handle the case where no matching project is found
            return {
              id: project.id,
              projectName: project.name,
         
            };
          }
      });  
      return res.json(combinedData);

  }   catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server Error' });
  }   
}


module.exports = {
    getAllProjectsCostWithCorrespondingNames,
    getAllProjectsWithCorrespondingNames,
    getAllProjectsWithCorrespondingNameList
};