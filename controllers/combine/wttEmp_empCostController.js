const moment = require('moment');

const wttEmployeeController = require('../database2/wttEmployeeController');
const resourceCostController = require('../database1/resourceCostController');
const designationController = require('../database2/designationController');

const getAllResourceCostWithNames = async (req, res) => {
    try {
        const employees = await wttEmployeeController.getAllEmployees2();
        const resourceCosts = await resourceCostController.getAllResourceCosts2();
        const designations = await designationController.getAllDesignations2();

        const combinedData = employees?.map((emp) => {
            // Find the associated rcost
            const resources = resourceCosts.find((rc) => rc.FK_WTT_Employee_ID === emp.id);
            // Find the associated Designation
            const designation = designations.find((d) => d.id === emp.FK_WTT_Master_Emp_Designation_ID);
            

            // Assume joiningDate is a Date object
            const formattedJoiningDate = moment(emp.JoiningDate).format('DD/MM/YYYY');
            
            if (resources) {
                        
              return {
                id: resources.id,
                employeeCode: emp.EmployeeCode,
                employeeName: emp.FullName,  
                // designationId: emp.FK_WTT_Master_Emp_Designation_ID,
                designationName: designation ? designation.name : 'N/A',
                joiningDate: formattedJoiningDate,
                FK_WTT_Employee_ID: resources.FK_WTT_Employee_ID,
                totalMonthlyCost: resources.totalMonthlyCost, 
                monthlyCostComp1: resources.monthlyCostComp1,
                monthlyCostComp2: resources.monthlyCostComp2,
                monthlyCostComp3: resources.monthlyCostComp3,
                monthlyCostComp4: resources.monthlyCostComp4
              };
            } else {
              // Handle the case where no matching project is found
              return {
                id: 'N/A',
                employeeCode: emp.EmployeeCode,
                employeeName: emp.FullName,  
                // designationId: emp.FK_WTT_Master_Emp_Designation_ID,
                designationName: designation ? designation.name : 'N/A',
                joiningDate: formattedJoiningDate,
                FK_WTT_Employee_ID: emp.id,
                totalMonthlyCost: 0,
                monthlyCostComp1: 0,
                monthlyCostComp2: 0,
                monthlyCostComp3: 0,
                monthlyCostComp4: 0
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
  getAllResourceCostWithNames,
};