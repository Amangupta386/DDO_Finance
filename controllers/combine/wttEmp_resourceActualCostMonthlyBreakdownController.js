const moment = require('moment');

const wttEmployeeController = require('../database2/wttEmployeeController');
const resourceCostActualBreakdownByMonthController = require('../database1/resourceCostActualBreakdownByMonthController');
const { WTT_ProjectResources } = require('../../models/database2/wtt_projectresources');
const { WTT_Employee } = require('../../models/database2/wtt_employee');
const { Op, where } = require('sequelize');
const { WTT_FinancialYear } = require('../../models/database2/wtt_financialYear');
const { ResourceCostActualBreakdownByMonth } = require('../../models/database1/ResourceCostActualBreakdownByMonth');

const getAllResourceCostWithProjectId = async (req, res) => {
  const { projectId }= req.params;
  const { fyId } = req.query;

  try {
    var fy;
    const filter = {
      FK_WTT_Project_ID: projectId,
      isActive: 'true', 
      
    };
    if(fyId){
      fy   = await WTT_FinancialYear.findOne(
        {
          where:{
          id:fyId
        }
      }
      );
      filter.endDate= {
        [Op.lte]: fy.endDate // This checks if endDate is greater than or equal to the current date
      };
      filter.startDate={
        [Op.gte]: fy.startDate
      };
    }
   
    const employees = JSON.parse(JSON.stringify(await WTT_ProjectResources.findAll({
      where: filter,
      include: [
        {
          model: WTT_Employee, // Assuming WTT_Employee is the name of the Employee table
          as: 'Employee', // Adjust this according to the actual association alias in your Sequelize model
        }
      ]
    })));
    employees.forEach(emp => {
       const tempId = emp.id;
       delete emp.id; 
       emp.fk_id = tempId;
    });
    const resourceCostActual = await resourceCostActualBreakdownByMonthController.getRecordByProjectId(projectId);
    (resourceCostActual, "Data employees:");
    (employees, "employees: d");
    const combinedData = employees?.map((empD) => {
       const employee = empD.Employee;
      // Find the associated employee
      const rc = resourceCostActual?.find((rc) => employee.id === rc.FK_WTT_Employee_ID);
     
      // Log the values after defining the 'employee' variable
      // ('employee.dataValues.id:', employee ? employee.dataValues.id : 'N/A');
      // ('rc.FK_WTT_Employee_ID:', rc.FK_WTT_Employee_ID);

      // Assume joiningDate is a Date object
      const formattedJoiningDate = employee ? moment(employee.JoiningDate).format('DD/MM/YYYY') : 'N/A';

      if (employee) {
        return {
          id: rc?.id || undefined,
          employeeCode: employee.EmployeeCode,
          employeeName: employee.FullName,
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
const updateAllResourceCostWithProjectId = async (req, res) => {
  const { id } = req.body;


  try {
    let rec; 
    if(id){
        rec = await ResourceCostActualBreakdownByMonth.findOne({
          where: {
            id
          }
        })
    }

    if(!rec){
        const date = new Date();
      const inputObj  = { 
        createdAt:date ,
      updatedAt: date,
      sort: 1,
      createdById:req.user.id,
      updatedById: req.user.id,
      FK_FinancialYear_ID: req.body.FK_FinancialYear_ID,
      FK_WTT_Project_ID: req.body.FK_WTT_Project_ID,
      FK_WTT_Employee_ID: req.body.FK_WTT_Employee_ID,
    };
    req.body.monthValues.forEach((data)=>{
      inputObj[data.label.toLowerCase()] = data.value || 0;
      inputObj[data.label.toLowerCase()+'Comment'] = data.commentValue || '';
    });

    await ResourceCostActualBreakdownByMonth.create(inputObj);
    return  res.send({
      message:"Record Updated"
    });
     
    }
    req.body.monthValues.forEach((data)=>{
      rec[data.label.toLowerCase()] = data.value || 0;
      rec[data.label.toLowerCase()+'Comment'] = data.commentValue || '';
    });


    rec.save();
    if(resourceCostActual) {
      return res.send({
        message:"Record Updated"
      });
    } else {
      return res.json("Record not found");
    }

  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllResourceCostWithProjectId,
  updateAllResourceCostWithProjectId
};