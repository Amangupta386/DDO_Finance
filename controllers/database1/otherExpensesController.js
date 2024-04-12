const { OtherExpensesActualBreakdownByMonth } = require('../../models/database1/OtherExpensesActualBreakdownByMonth');

// GET API Controller Function
const getOtherExpenses = async (req, res) => {
  try {
    const { FK_FinancialYear_ID, FK_WTT_Project_ID, FK_ExpenseCategory_ID } = req.query; // Changed from req.params to req.query
    const expenses = await OtherExpensesActualBreakdownByMonth.findAll({
      where: {
        FK_FinancialYear_ID,
        FK_WTT_Project_ID,
        FK_ExpenseCategory_ID
      }
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
