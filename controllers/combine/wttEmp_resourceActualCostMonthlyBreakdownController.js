const moment = require('moment');

const wttEmployeeController = require('../database2/wttEmployeeController');
const resourceCostActualBreakdownByMonthController = require('../database1/resourceCostActualBreakdownByMonthController');
const { WTT_ProjectResources } = require('../../models/database2/wtt_projectresources');
const { WTT_Employee } = require('../../models/database2/wtt_employee');
const { Op, where } = require('sequelize');
const { WTT_FinancialYear } = require('../../models/database2/wtt_financialYear');
const { ResourceCostActualBreakdownByMonth } = require('../../models/database1/ResourceCostActualBreakdownByMonth');
const wttProjectResourcesController = require('../database2/wttProjectResourcesController');
const resourceCostController = require('../database1/resourceCostController');
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
      // filter.endDate= {
      //   [Op.lte]: fy.endDate // This checks if endDate is greater than or equal to the current date
      // };
      // filter.startDate={
      //   [Op.gte]: fy.startDate
      // };
    }
    const resourceCosts = await resourceCostController.getAllResourceCosts2();
    const resourceAllocations =  (await wttProjectResourcesController.getAllAllocatedResources(fy.startDate.getTime(), fy.endDate.getTime(), res)).filter((f)=>f.FK_WTT_Project_ID == projectId);
        const employees = JSON.parse(JSON.stringify(resourceAllocations));
   
   
        employees.forEach(emp => {
       const tempId = emp.id;
       delete emp.id; 
       emp.fk_id = tempId;
    });
    const resourceCostActual = await resourceCostActualBreakdownByMonthController.getRecordByProjectId(projectId);
    const emp =  await WTT_Employee.findAll({
      where: {
        IsActive: 'true', 
      },
    });
 
    // res.send({emp,empD});
    const combinedData = [...employees]?.map((empD) => {
     
      const employee =emp.find((e)=> e.id == empD.FK_WTT_Employee_ID);
      if(!employee){
        return employee;
      }
      const formattedJoiningDate = employee ? moment(employee.JoiningDate).format('DD/MM/YYYY') : 'N/A';
      // Find the associated employee
      const resources = resourceCosts.find((rc) => rc?.FK_WTT_Employee_ID == employee.id);
      if(!resources){
        return {
          d:fy.startDate,
          id: undefined,
          employeeCode: employee.EmployeeCode,
          employeeName: employee.FullName,
          // Additional properties
          joiningDate: formattedJoiningDate,
          FK_WTT_Employee_ID: employee.id || 'N/A',
          // Additional properties from your controller
          createdAt: 'N/A',
          updatedAt: 'N/A',
          sort: 'N/A',
          createdById:  'N/A',
          updatedById:  'N/A',
          FK_FinancialYear_ID: +fyId || 'N/A',
          FK_WTT_Project_ID: +projectId || 'N/A',
          // Include monthValues array
          monthValues: [
            { label: 'April', value:  0, commentValue:  '' },
            { label: 'May', value:0, commentValue: ''},
            { label: 'June', value:0, commentValue:  '' },
            { label: 'July', value:  0, commentValue:  '' },
            { label: 'August', value: 0, commentValue: ''},
            { label: 'September', value:  0, commentValue:  ''},
            { label: 'October', value:  0, commentValue: ''},
            { label: 'November', value:  0, commentValue:  ''},
            { label: 'December', value:  0, commentValue:  ''},
            { label: 'January', value:  0, commentValue: ''},
            { label: 'February', value: 0, commentValue: ''},
            { label: 'March', value:  0, commentValue: ''},
          ],
        };
      }
      const totalMonthlyCost = parseInt(resources.monthlyCostComp1) + parseInt(resources.monthlyCostComp2) + parseInt(resources.monthlyCostComp3) + parseInt(resources.monthlyCostComp4);                      
           
      const rc = resourceCostActual?.find((rc) => employee.id === rc.FK_WTT_Employee_ID);
      const empAllocation = resourceAllocations.filter((ra)=> ra.FK_WTT_Project_ID == projectId &&  ra.FK_WTT_Employee_ID == employee.id).map((da)=>{
        return {
            endMonth: da.endDate.getMonth()+1, 
            endYear: da.endDate.getFullYear(), 
            startYear: da.startDate.getFullYear(),
            startMonth: da.startDate.getMonth()+1, 
            allocPercent: da.allocPercent,
            
        };
      });
      console.log(empAllocation, "empAllocation", fy.endDate, fy.startDate)
      if (!empAllocation)
        return {
          d:fy.startDate,
          id: rc?.id || undefined,
          employeeCode: employee.EmployeeCode,
          employeeName: employee.FullName,
          // Additional properties
          joiningDate: formattedJoiningDate,
          FK_WTT_Employee_ID: employee.id || 'N/A',
          // Additional properties from your controller
          createdAt: rc?.createdAt || 'N/A',
          updatedAt: rc?.updatedAt || 'N/A',
          sort: rc?.sort || 'N/A',
          createdById: rc?.createdById || 'N/A',
          updatedById: rc?.updatedById || 'N/A',
          FK_FinancialYear_ID: +fyId || 'N/A',
          FK_WTT_Project_ID: +projectId || 'N/A',
          // Include monthValues array
          monthValues: [
            { label: 'April', value: rc?.april || 0, commentValue: rc?.aprilComment || '' },
            { label: 'May', value: rc?.may || 0, commentValue: rc?.mayComment || ''},
            { label: 'June', value: rc?.june || 0, commentValue: rc?.juneComment || '' },
            { label: 'July', value: rc?.july || 0, commentValue: rc?.julyComment || '' },
            { label: 'August', value: rc?.august || 0, commentValue: rc?.augustComment || ''},
            { label: 'September', value: rc?.september || 0, commentValue: rc?.septemberComment || ''},
            { label: 'October', value: rc?.october || 0, commentValue: rc?.octoberComment || ''},
            { label: 'November', value: rc?.november || 0, commentValue: rc?.novemberComment || ''},
            { label: 'December', value: rc?.december || 0, commentValue: rc?.decemberComment || ''},
            { label: 'January', value: rc?.january || 0, commentValue: rc?.januaryComment || ''},
            { label: 'February', value: rc?.february || 0, commentValue: rc?.februaryComment || ''},
            { label: 'March', value: rc?.march || 0, commentValue: rc?.marchComment || ''},
          ],
        };

      const costToThisProject = (month, date) => {
        const year = date.getFullYear();
        const allocation = empAllocation.filter((allo) => {
          const startMonth = allo.startMonth == 1 ? 13 : allo.startMonth == 2 ? 14 : allo.startMonth == 3 ? 15 : allo.startMonth;
          const endMonth = allo.endMonth == 1 ? 13 : allo.endMonth == 2 ? 14 : allo.endMonth == 3 ? 15 : allo.endMonth;
          const newmonth = month == 1 ? 13 : month == 2 ? 14 : month == 3 ? 15 : month;


          if ((allo.startYear == year || allo.endYear == year) && (startMonth <= newmonth && endMonth >= newmonth)) {
            return true
          }
          return false;
        });
        console.log(allocation, month, year);
        return allocation.reduce((prev, curr)=>{
          return prev + (totalMonthlyCost * (+curr.allocPercent/100))
        },0)
      }; 
     
      // Log the values after defining the 'employee' variable
      // ('employee.dataValues.id:', employee ? employee.dataValues.id : 'N/A');
      // ('rc.FK_WTT_Employee_ID:', rc.FK_WTT_Employee_ID);

      // Assume joiningDate is a Date object
     

      if (employee) {
        return {
          d:fy.startDate,
          id: rc?.id || undefined,
          employeeCode: employee.EmployeeCode,
          employeeName: employee.FullName,
          // Additional properties
          joiningDate: formattedJoiningDate,
          FK_WTT_Employee_ID: employee.id || 'N/A',
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
          FK_FinancialYear_ID: +fyId|| 'N/A',
          FK_WTT_Project_ID: +projectId || 'N/A',
          // Include monthValues array
          monthValues: [
            { label: 'April', value: rc?.april || costToThisProject(4, fy.startDate), commentValue: rc?.aprilComment || '' },
            { label: 'May', value: rc?.may || costToThisProject(5, fy.startDate), commentValue: rc?.mayComment || ''},
            { label: 'June', value: rc?.june || costToThisProject(6, fy.startDate), commentValue: rc?.juneComment || '' },
            { label: 'July', value: rc?.july || costToThisProject(7, fy.startDate), commentValue: rc?.julyComment || '' },
            { label: 'August', value: rc?.august || costToThisProject(8, fy.startDate), commentValue: rc?.augustComment || ''},
            { label: 'September', value: rc?.september || costToThisProject(9, fy.startDate), commentValue: rc?.septemberComment || ''},
            { label: 'October', value: rc?.october || costToThisProject(10, fy.startDate), commentValue: rc?.octoberComment || ''},
            { label: 'November', value: rc?.november || costToThisProject(11, fy.startDate), commentValue: rc?.novemberComment || ''},
            { label: 'December', value: rc?.december || costToThisProject(12, fy.startDate), commentValue: rc?.decemberComment || ''},
            { label: 'January', value: rc?.january || costToThisProject(1, fy.endDate), commentValue: rc?.januaryComment || ''},
            { label: 'February', value: rc?.february || costToThisProject(2, fy.endDate), commentValue: rc?.februaryComment || ''},
            { label: 'March', value: rc?.march || costToThisProject(3, fy.endDate), commentValue: rc?.marchComment || ''},
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
   const result = combinedData.filter((d)=>d);
   const output = [];
   for (let index = 0; index < result.length; index++) {
    const element = result[index];
    const data = output.find((out)=> out.FK_WTT_Employee_ID == element.FK_WTT_Employee_ID); 
    if(data){
      // data.monthValues = data.monthValues.map((d,i)=>{
      //    d.value += parseInt(element.monthValues[i].value);
      //    return d;
      // })
    }else{
      output.push(element);
    }
    
   }
    
    
    if(output) {
      return res.json(output);
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
    console.log(inputObj, "cons11");
    await ResourceCostActualBreakdownByMonth.create(inputObj);
    console.log(inputObj, "cons13");
    return  res.send({
      message:"Record Updated"
    });
     
    }
    req.body.monthValues.forEach((data)=>{
      rec[data.label.toLowerCase()] = data.value || 0;
      rec[data.label.toLowerCase()+'Comment'] = data.commentValue || '';
    });


    rec.save();
      return res.send({
        message:"Record Updated"
      });
   

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getAllResourceCostWithProjectId,
  updateAllResourceCostWithProjectId
};