const multer = require('multer');
const moment = require('moment');
const wttEmployeeController = require('../database2/wttEmployeeController');
const resourceCostController = require('../database1/resourceCostController');
const designationController = require('../database2/designationController');
const xlsx = require('xlsx');
const { ResourceCost } = require('../../models/database1/resourceCost');


// Configure multer for disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where you want to store the uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const getAllResourceCostWithNames = async (req, res) => {
    console.log('uuuuu');
    try {
        const employees = await wttEmployeeController.getAllEmployees2();
        const resourceCosts  = await resourceCostController.getAllResourceCosts2();
        const designations = await designationController.getAllDesignations2();

        const combinedData = employees?.map((emp) => {
            const resources = resourceCosts.find((rc) => rc.FK_WTT_Employee_ID === emp.id);
            const designation = designations.find((d) => d.id === emp.FK_WTT_Master_Emp_Designation_ID);
            const formattedJoiningDate = moment(emp.JoiningDate).format('DD/MM/YYYY');
            
            
            if (resources) {       
                return {
                    id: resources.id,
                    employeeCode: emp.EmployeeCode,
                    employeeName: emp.FullName,  
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
                return {
                    id: 'N/A',
                    employeeCode: emp.EmployeeCode,
                    employeeName: emp.FullName,  
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }   
}


const uploadExcel = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const file = req.file;
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
  
      const employees = await wttEmployeeController.getAllEmployees2();
  
      const transformedData = data.map(item => {
        const emp = employees.find(emp => emp.EmployeeCode == item.EmployeeId);
        if (!emp) {
          console.error(`Employee not found for EmployeeId: ${item.EmployeeId}`);
          return null;
        }
        return {
          FK_WTT_Employee_ID: emp.id,
          monthlyCostComp1: item.MonthlyCostComp1,
          monthlyCostComp2: item.MonthlyCostComp2,
          monthlyCostComp3: item.MonthlyCostComp3,
          monthlyCostComp4: item.MonthlyCostComp4,
          createdById: req.user.id,
          totalMonthlyCost: 0
        };
      }); // Remove null values from the array
  
      for (let i = 0; i < transformedData.length; i++) {
        const resources = await ResourceCost.findOne({ where: { FK_WTT_Employee_ID: transformedData[i].FK_WTT_Employee_ID } });
        if (!resources) {
          console.error(`Resource not found for FK_WTT_Employee_ID: ${transformedData[i].FK_WTT_Employee_ID}`);
          continue; // Skip to the next iteration of the loop
        }
        resources['monthlyCostComp1'] = transformedData[i].monthlyCostComp1;
        resources['monthlyCostComp2'] = transformedData[i].monthlyCostComp2;
        resources['monthlyCostComp3'] = transformedData[i].monthlyCostComp3;
        resources['monthlyCostComp4'] = transformedData[i].monthlyCostComp4;
        console.log(resources);
        await resources.save();
      }
  
      return res.status(200).json({ message: "Updated Data" });
    } catch (error) {
      console.error("Error during uploadExcel:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }


module.exports = {
    getAllResourceCostWithNames,
    uploadExcel
};
