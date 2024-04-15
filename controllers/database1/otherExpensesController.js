const { OtherExpensesActualBreakdownByMonth } = require('../../models/database1/OtherExpensesActualBreakdownByMonth');


const getOtherExpenses = async (req, res) => {
    try {
      const records = await OtherExpensesActualBreakdownByMonth.findAll();
      const formattedRecords = records.map(record => ({
        id: record.id,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        sort: record.sort,
        createdById: record.createdById,
        updatedById: record.updatedById,
        FK_FinancialYear_ID: record.FK_FinancialYear_ID,
        FK_WTT_Project_ID: record.FK_WTT_Project_ID,
        parentId: record.parentId,
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
      }));
  
      res.status(200).json(formattedRecords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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
    const newExpense = await OtherExpensesActualBreakdownByMonth.create(req.body);
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

module.exports = {
  getOtherExpenses,
  createOtherExpense,
  updateOtherExpense
};
