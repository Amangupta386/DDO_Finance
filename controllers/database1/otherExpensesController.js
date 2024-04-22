const { OtherExpensesActualBreakdownByMonth } = require('../../models/database1/OtherExpensesActualBreakdownByMonth');
const { WTTProject } = require('../../models/database2/wtt_project');
const { Op } = require('sequelize');



const getOtherExpenses = async (req, res) => {
  try {
    const { financialYearId, projectId} = req.query;

    if(!financialYearId){
      throw new Error("financialYearId is missing in the query params");
    }
    const whereClause = {
      FK_FinancialYear_ID: financialYearId,
    };
    if (projectId) {
      whereClause.FK_WTT_Project_ID = projectId;
    }
    const expenses = await OtherExpensesActualBreakdownByMonth.findAll({
      where: whereClause,
    });
    const formattedRecords = expenses.map(formatOtherExpenseRecord);
    res.status(200).json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });   
  }
};


const formatOtherExpenseRecord = (expense) => {
  return {
    id: expense.id,
    createdAt: expense.createdAt,
    updatedAt: expense.updatedAt,
    sort: expense.sort,
    createdById: expense.createdById,
    updatedById: expense.updatedById,
    FK_FinancialYear_ID: expense.FK_FinancialYear_ID,
    FK_WTT_Project_ID: expense.FK_WTT_Project_ID,
    FK_ExpenseCategory_ID: expense.FK_ExpenseCategory_ID,
    parentId: expense.parentId,
    monthValues: [
      { label: 'April', value: expense.april, commentValue: expense.aprilComment },
      { label: 'May', value: expense.may, commentValue: expense.mayComment },
      { label: 'June', value: expense.june, commentValue: expense.juneComment },
      { label: 'July', value: expense.july, commentValue: expense.julyComment },
      { label: 'August', value: expense.august, commentValue: expense.augustComment },
      { label: 'September', value: expense.september, commentValue: expense.septemberComment },
      { label: 'October', value: expense.october, commentValue: expense.octoberComment },
      { label: 'November', value: expense.november, commentValue: expense.novemberComment },
      { label: 'December', value: expense.december, commentValue: expense.decemberComment },
      { label: 'January', value: expense.january, commentValue: expense.januaryComment },
      { label: 'February', value: expense.february, commentValue: expense.februaryComment },
      { label: 'March', value: expense.march, commentValue: expense.marchComment },
    ],
  };
};



// // GET API Controller Function
// const getOtherExpenses = async (req, res) => {
//   try {
//     const { FK_FinancialYear_ID, FK_WTT_Project_ID, FK_ExpenseCategory_ID } = req.query; // Changed from req.params to req.query
//     const expenses = await OtherExpensesActualBreakdownByMonth.findAll({
//       where: {
//         FK_FinancialYear_ID,
//         FK_WTT_Project_ID,
//         FK_ExpenseCategory_ID
//       }
//     });
//     res.status(200).json(expenses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// POST API Controller Function
const createOtherExpense = async (req, res) => {
  try {
    const newExpense = await OtherExpensesActualBreakdownByMonth.create({...req.body, createdById: req.user.id,createdAt:new Date()});
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT API Controller Function
const updateOtherExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await OtherExpensesActualBreakdownByMonth.update(req.body, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const updatedExpense = await OtherExpensesActualBreakdownByMonth.findByPk(id);
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDashboardOtherExpensesActual = async (req, res) => {
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

    const records = await OtherExpensesActualBreakdownByMonth.findAll({
      where: whereClause,
    });

    const formattedRecords = records.map(formatOtherExpenseRecord);
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
  getOtherExpenses,
  createOtherExpense,
  updateOtherExpense,
  formatOtherExpenseRecord,
  getDashboardOtherExpensesActual
};
