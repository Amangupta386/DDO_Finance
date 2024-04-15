const { OtherExpensesActualBreakdownByMonth } = require('../../models/database1/OtherExpensesActualBreakdownByMonth');


const getOtherExpenses = async (req, res) => {
  try {
    const { financialYearId, projectId} = req.query;

    // Retrieve expenses from the database
    const expenses = await OtherExpensesActualBreakdownByMonth.findAll({
      where: {
        FK_FinancialYear_ID: financialYearId,
        FK_WTT_Project_ID:projectId,
       
      }
    });

    // Format the response
    const formattedExpenses = expenses.map(expense => ({
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
    }));

    // Send the formatted expenses as JSON response
    res.status(200).json(formattedExpenses);
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
