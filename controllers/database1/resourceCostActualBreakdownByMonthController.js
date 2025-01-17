// controllers/resourceCostActualBreakdownByMonthController.js
const {ResourceCostActualBreakdownByMonth} = require('../../models/database1/ResourceCostActualBreakdownByMonth');
const { WTT_Employee } = require('../../models/database2/wtt_employee');
const { WTTProject } = require('../../models/database2/wtt_project');
const wttEmployeeController = require('../database2/wttEmployeeController');
const { Op } = require('sequelize');
const xlsx = require('xlsx');




const createRecord = async (req, res) => {
  try {
    const newRecord = await ResourceCostActualBreakdownByMonth.create({...req.body, createdById: req.user.id,createdAt:new Date()});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllRecords = async (req, res) => {
  try {
    const { projectId } = req.query;
    const whereClause = {};

    if (projectId) {
      whereClause.FK_WTT_Project_ID = projectId;
    }

    const records = await ResourceCostActualBreakdownByMonth.findAll({
      where: whereClause,
    });

    const formattedRecords = records.map(formatResourceCostRecord);
    res.status(200).json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await ResourceCostActualBreakdownByMonth.findByPk(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const formattedRecord = formatResourceCostRecord(record);
    res.status(200).json(formattedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRecordByProjectId = async (projectId) => {
  const projectIdAsInt = parseInt(projectId);
  try {
    const record = await ResourceCostActualBreakdownByMonth.findAll({
      where: { FK_WTT_Project_ID: projectIdAsInt }
    });
    
    if (!record || record.length === 0) {
      ('Record not found');
    } else {
      // ('Records: ', record);
      // const formattedRecord = formatResourceCostRecord(record);
      // (formattedRecord);
      return record;

    }
  } catch (error) {
    console.error('Internal Server Error:', error);
  }
};

const getResourceCostByEmployeeId = async (req, res) => {
  try {
    const resourceCost = await ResourceCostActualBreakdownByMonth.findOne({where: {FK_WTT_Employee_ID: req.params.id}});
    // ('res: ',resourceCost);
    if (!resourceCost) {
      return res.status(404).json({ error: 'ResourceCost not found' });
    }
    // return res.json(resourceCost);
    return resourceCost;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// Express (HTTP) Handling
const getRecordByProjectIdExpress = async (req, res) => {
  const { projectId } = req.params;
  try {
    const record = await ResourceCostActualBreakdownByMonth.findAll({
      where: { FK_WTT_Project_ID: projectId }
    });
    
    if (!record || record.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    
    const formattedRecord = formatResourceCostRecord(record);
    res.status(200).json(formattedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to format record
const formatResourceCostRecord = (record) => {
  return {
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    sort: record.sort,
    createdById: record.createdById,
    updatedById: record.updatedById,
    FK_FinancialYear_ID: record.FK_FinancialYear_ID,
    FK_WTT_Project_ID: record.FK_WTT_Project_ID,
    FK_WTT_Employee_ID: record.FK_WTT_Employee_ID,
    monthValues: [
      { label: 'April', value: record.april, commentValue: record.aprilComment },
      { label: 'May', value: record.may, commentValue: record.mayComment },
      { label: 'June', value: record.june, commentValue: record.juneComment },
      { label: 'July', value: record.july, commentValue: record.julyComment },
      { label: 'August', value: record.august, commentValue: record.augustComment },
      { label: 'September', value: record.september, commentValue: record.septemberComment },
      { label: 'October', value: record.october, commentValue: record.octoberComment },
      { label: 'November', value: record.november, commentValue: record.novemberComment },
      { label: 'December', value: record.december, commentValue: record.decemberComment },
      { label: 'January', value: record.january, commentValue: record.januaryComment },
      { label: 'February', value: record.february, commentValue: record.februaryComment },
      { label: 'March', value: record.march, commentValue: record.marchComment },
    ],
  };
};



const updateRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await ResourceCostActualBreakdownByMonth.update(req.body, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updatedRecord = await ResourceCostActualBreakdownByMonth.findByPk(id);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await ResourceCostActualBreakdownByMonth.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getDashboardResourceCostActual = async (req, res) => {
  try {
    const { financialYearId, projectId, buId, clientId, employeeId } = req.query;
    const filter = {};
    if (clientId) {
      filter['FK_WTT_Customer_ID'] = clientId;
    }

    if (buId) {
      filter['FK_WTT_BusinessUnit_ID'] = buId;
    }
    if (projectId) {
      filter['id'] = projectId;
    }

    const wttProjects = await WTTProject.findAll({
      order: [['id', 'ASC']],
      where: filter,
    });

    console.log(JSON.parse(JSON.stringify(wttProjects)));

    const whereClause = {
    };
  if(financialYearId){
      
      whereClause.FK_FinancialYear_ID= +financialYearId;
  }

    if (wttProjects.length) {
      whereClause.FK_WTT_Project_ID = {[Op.in]: wttProjects.map(p=> p.id)};
    }else{
      return  res.status(200).json([]);
    }

    if(employeeId){
      whereClause.FK_WTT_Employee_ID  = employeeId;
    }
      
    const records = await ResourceCostActualBreakdownByMonth.findAll({
      where: whereClause,
    });

    const formattedRecords = records.map(formatResourceCostRecord);
    const data = []; 
    for(let i=0; i< formattedRecords.length; i++){
      const dataChild = formattedRecords[i];
      const child = data.find((ch)=>ch.FK_WTT_Employee_ID == dataChild.FK_WTT_Employee_ID);
      if(child){
        child.monthValues = child.monthValues.map((d, i)=> {
          if(d)
           d.value = (+d.value) + (+(dataChild.monthValues[i].value));
          return d;
        });
      }else{
        // Fetch employee name based on FK_WTT_Employee_ID
      const employee = await WTT_Employee.findOne({ where: { id: dataChild.FK_WTT_Employee_ID } });
      if (!employee) {
        console.error(`Employee with ID ${FK_WTT_Employee_ID} not found.`);
        continue; // Skip to the next record
      }
        data.push({...dataChild, employeeName:employee.FullName});
      }
      
    }
    

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



const uploadExcelForResourceCost = async (req, res) => {
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

    // Iterate through each item in the uploaded data
    for (const item of data) {
      console.log(item);
      const emp = employees.find(emp => emp.id == item.EmployeeId);
      if (!emp) {
        console.error(`Employee not found for EmployeeId: ${item.EmployeeId}`);
        continue;
      }
      let dataRec = await ResourceCostActualBreakdownByMonth.findOne({
        where:{
               FK_WTT_Employee_ID: emp.id,
          FK_FinancialYear_ID: item.FK_FinancialYear_ID,
          FK_WTT_Project_ID: item.FK_WTT_Project_ID
        }
      });

        if (!dataRec) {
          // Create a new record if no existing record was found
          dataRec = await ResourceCostActualBreakdownByMonth.create({
            FK_WTT_Employee_ID: emp.id,
            FK_FinancialYear_ID: item.FK_FinancialYear_ID,
            FK_WTT_Project_ID: item.FK_WTT_Project_ID,
          april: item.April,
          may: item.May,
          june: item.June,
          july: item.July,
          august: item.August,
          september: item.September,
          october: item.October,
          november: item.November,
          december: item.December,
          january: item.January,
          february: item.February,
          march: item.March,
          aprilComment: item.AprilComment,
          mayComment: item.MayComment,
          juneComment: item.JuneComment,
          julyComment: item.JulyComment,
          augustComment: item.AugustComment,
          septemberComment: item.SeptemberComment,
          octoberComment: item.OctoberComment,
          novemberComment: item.NovemberComment,
          decemberComment: item.DecemberComment,
          januaryComment: item.JanuaryComment,
          februaryComment: item.FebruaryComment,
          marchComment: item.MarchComment,
          createdById: req.user.id,
          updatedAt: new Date(),
          createdAt: new Date()
            // createdById: req.user.id
          });
     
      
      }else{
        const obj = {
          FK_WTT_Employee_ID: emp.id,
          FK_FinancialYear_ID: item.FK_FinancialYear_ID,
          FK_WTT_Project_ID: item.FK_WTT_Project_ID,
          april: item.April,
          may: item.May,
          june: item.June,
          july: item.July,
          august: item.August,
          september: item.September,
          october: item.October,
          november: item.November,
          december: item.December,
          january: item.January,
          february: item.February,
          march: item.March,
          aprilComment: item.AprilComment,
          mayComment: item.MayComment,
          juneComment: item.JuneComment,
          julyComment: item.JulyComment,
          augustComment: item.AugustComment,
          septemberComment: item.SeptemberComment,
          octoberComment: item.OctoberComment,
          novemberComment: item.NovemberComment,
          decemberComment: item.DecemberComment,
          januaryComment: item.JanuaryComment,
          februaryComment: item.FebruaryComment,
          marchComment: item.MarchComment,
          createdById: req.user.id,
          updatedAt: new Date(),
        };
        for(let key in obj){
          dataRec[key] = obj[key];
        }
      await dataRec.save();
      }
    
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error during uploadExcelForResourceCost:", error.message);
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  getRecordByProjectId,
  getRecordByProjectIdExpress,
  updateRecord,
  deleteRecord,
  getResourceCostByEmployeeId,
  getDashboardResourceCostActual,
  uploadExcelForResourceCost
  
};
