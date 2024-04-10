
// const {OtherExpensesActualBreakdownByMonth} = require('../../models/database1/OtherExpensesActualBreakdownByMonth');

const { OtherExpensesActualBreakdownByMonth, ExpenseCategories } = require('../../models/database1/OtherExpensesActualBreakdownByMonth');

const getAllExpensesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const expenses = await OtherExpensesActualBreakdownByMonth.findAll({
      where: { FK_ExpenseCategory_ID: categoryId },
      include: [{ model: ExpenseCategories, as: 'category' }]
    });
    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createExpenseByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const expenseData = { ...req.body, FK_ExpenseCategory_ID: categoryId };
    const expense = await OtherExpensesActualBreakdownByMonth.create(expenseData);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getExpenseByIdAndCategory = async (req, res) => {
  const { categoryId, id } = req.params;
  try {
    const expense = await OtherExpensesActualBreakdownByMonth.findOne({
      where: { id, FK_ExpenseCategory_ID: categoryId },
      include: [{ model: ExpenseCategories, as: 'category' }]
    });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    return res.json(expense);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateExpenseByCategory = async (req, res) => {
  const { categoryId, id } = req.params;
  try {
    const [updatedRowsCount, updatedExpense] = await OtherExpensesActualBreakdownByMonth.update(
      req.body,
      {
        where: { id, FK_ExpenseCategory_ID: categoryId },
        returning: true,
      }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    return res.json(updatedExpense[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteExpenseByCategory = async (req, res) => {
  const { categoryId, id } = req.params;
  try {
    const deletedRowsCount = await OtherExpensesActualBreakdownByMonth.destroy({
      where: { id, FK_ExpenseCategory_ID: categoryId },
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllExpensesByCategory,
  createExpenseByCategory,
  getExpenseByIdAndCategory,
  updateExpenseByCategory,
  deleteExpenseByCategory,
};

