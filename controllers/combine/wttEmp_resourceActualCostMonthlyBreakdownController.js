const moment = require('moment');

const wttEmployeeController = require('../database2/wttEmployeeController');
const resourceCostActualBreakdownByMonthController = require('../database1/resourceCostActualBreakdownByMonthController');

const getAllResourceCostWithNames = async (req, res) => {
  const { projectId } = req.params;

  try {
    const employees = await wttEmployeeController.getAllEmployees2();
    const resourceCostActual = await resourceCostActualBreakdownByMonthController.getRecordByProjectId(projectId);
    console.log(resourceCostActual, "Data employees:");
    const combinedData = employees?.map((employee) => {
      // Find the associated employee
      const rc = resourceCostActual?.find((rc) => employee.dataValues.id === rc.FK_WTT_Employee_ID);
     
      // Log the values after defining the 'employee' variable
      // console.log('employee.dataValues.id:', employee ? employee.dataValues.id : 'N/A');
      // console.log('rc.FK_WTT_Employee_ID:', rc.FK_WTT_Employee_ID);

      // Assume joiningDate is a Date object
      const formattedJoiningDate = employee ? moment(employee.dataValues.JoiningDate).format('DD/MM/YYYY') : 'N/A';

      if (employee) {
        return {
          id: employee.dataValues.id,
          employeeCode: employee.dataValues.EmployeeCode,
          employeeName: employee.dataValues.FullName,
          // Additional properties
          joiningDate: formattedJoiningDate,
          FK_WTT_Employee_ID: rc?.FK_WTT_Employee_ID || 'N/A',
          monthlyCostComp1: rc?.monthlyCostComp1 || 'N/A',
          monthlyCostComp2: rc?.monthlyCostComp2 || 'N/A',
          monthlyCostComp3: rc?.monthlyCostComp3 || 'N/A',
          monthlyCostComp4: rc?.monthlyCostComp4 || 'N/A',
          // Additional properties from your controller
          createdAt: rc?.createdAt || 'N/A',
          updatedAt: rc?.updatedAt || 'N/A',
          sort: rc?.sort || 'N/A',
          createdById: rc?.createdById || 'N/A',
          updatedById: rc?.updatedById || 'N/A',
          FK_FinancialYear_ID: rc?.FK_FinancialYear_ID || 'N/A',
          FK_WTT_Project_ID: rc?.FK_WTT_Project_ID || 'N/A',
          // Include monthValues array
          monthValues: [
            { label: 'April', value: rc?.april || '', commentValue: rc?.aprilComment || '' },
            { label: 'May', value: rc?.may || '', commentValue: rc?.mayComment || ''},
            { label: 'June', value: rc?.june || '', commentValue: rc?.juneComment || '' },
            { label: 'July', value: rc?.july || '', commentValue: rc?.julyComment || '' },
            { label: 'August', value: rc?.august || '', commentValue: rc?.augustComment || ''},
            { label: 'September', value: rc?.september || '', commentValue: rc?.septemberComment || ''},
            { label: 'October', value: rc?.october || '', commentValue: rc?.octoberComment || ''},
            { label: 'November', value: rc?.november || '', commentValue: rc?.novemberComment || ''},
            { label: 'December', value: rc?.december || '', commentValue: rc?.decemberComment || ''},
            { label: 'January', value: rc?.january || '', commentValue: rc?.januaryComment || ''},
            { label: 'February', value: rc?.february || '', commentValue: rc?.februaryComment || ''},
            { label: 'March', value: rc?.march || '', commentValue: rc?.marchComment || ''},
          ],
        };
      } else {
        // Handle the case where no matching project is found
        return {
          id: 'N/A',
          employeeCode: 'N/A',
          employeeName: 'N/A',
          // Add other default values as needed
          joiningDate: 'N/A',
          FK_WTT_Employee_ID: 'N/A',
          monthlyCostComp1: 0,
          monthlyCostComp2: 0,
          monthlyCostComp3: 0,
          monthlyCostComp4: 0,
          // Add other default values from your controller
          createdAt: 'N/A',
          updatedAt: 'N/A',
          sort: 'N/A',
          createdById: 'N/A',
          updatedById: 'N/A',
          FK_FinancialYear_ID: 'N/A',
          FK_WTT_Project_ID: 'N/A',
          // Include empty monthValues array
          monthValues: [],
        };
      }
    });
    if(combinedData) {
      return res.json(combinedData);
    } else {
      return res.json("Record not found");
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllResourceCostWithNames,
};