const { ActualCollectionBreakdownByMonth }= require('../../models/database1/ActualCollectionBreakdownByMonth');
const { WTTProject } = require('../../models/database2/wtt_project');
const { Op } = require('sequelize');

const createRecord = async (req, res) => {
  try {
    const newRecord = await ActualCollectionBreakdownByMonth.create({...req.body, createdById: req.user.id});
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const { financialYearId, projectId } = req.query;
    if(!financialYearId){
      throw new Error("financialYearId is missing in the query params");
    }
    const whereClause = {
      FK_FinancialYear_ID: financialYearId,
    };
    if (projectId) {
      whereClause.FK_WTT_Project_ID = projectId;
    }
      const records = await ActualCollectionBreakdownByMonth.findAll({
        where: whereClause,
      });
      const formattedRecords = records.map(formatCollectionRecord);
      res.status(200).json(formattedRecords);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message }); 
    }
  };
  
  const getRecordById = async (req, res) => {
    const { id } = req.params;
    try {
      const record = await ActualCollectionBreakdownByMonth.findByPk(id);
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      const formattedRecord = formatCollectionRecord(record);
      res.status(200).json(formattedRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Helper function to format record
  const formatCollectionRecord = (record) => {
    return {
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      sort: record.sort,
      createdById: record.createdById,
      updatedById: record.updatedById,
      FK_FinancialYear_ID: record.FK_FinancialYear_ID,
      FK_WTT_Project_ID: record.FK_WTT_Project_ID,
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
    const [updatedRowsCount] = await ActualCollectionBreakdownByMonth.update(req.body, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updatedRecord = await ActualCollectionBreakdownByMonth.findByPk(id);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await ActualCollectionBreakdownByMonth.destroy({
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


const getDashboardActualCollection = async (req, res) => {
  try {
    const { financialYearId, projectId, buId, clientId } = req.query;
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

    const whereClause = {
    };
  if(financialYearId){
      
      whereClause.FK_FinancialYear_ID= +financialYearId;
  }
    if (wttProjects.length) {
      whereClause.FK_WTT_Project_ID = {[Op.in]: wttProjects.map(p=> p.id)};
    }
  else{
    return  res.status(200).json([]);
  }

    const records = await ActualCollectionBreakdownByMonth.findAll({
      where: whereClause,
    });

    const formattedRecords = records.map(formatCollectionRecord);
    const data = formattedRecords[0]; 
    formattedRecords.slice(1).forEach((dataChild)=>{
  
      data.monthValues = data.monthValues.map((d, i)=> {
        if(d)
         d.value = (+d.value) + (+(dataChild.monthValues[i].value));
        return d;
      });
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  getDashboardActualCollection
};
