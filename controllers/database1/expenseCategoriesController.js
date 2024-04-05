const { ExpenseCategories } = require('../../models/database1/expenseCategories');

// Create an ExpenseCategory
const createExpenseCategory = async (req, res) => {
  try {
    const expenseCategory = await ExpenseCategories.create(req.body);
    res.status(201).json(expenseCategory);
  } catch (error) {
    console.error('Error creating ExpenseCategory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Recursive function to build a tree structure
const buildCategoryTree = (categories, parentId = null) => {
    const categoryTree = [];
    for (const category of categories) {
        const categoryData = category.dataValues; // Access raw data
        if (categoryData.parentId === parentId || (categoryData.parentId === null && parentId === null)) {
            const children = buildCategoryTree(categories, categoryData.id);
            categoryData.children = children;
            categoryTree.push(categoryData);
        }
    }
    return categoryTree;
};

// Get all ExpenseCategories
const getAllExpenseCategories = async (req, res) => {
    try {
      const { tree } = req.query;
  
      if (tree && tree.toLowerCase() === 'true') {
        // Get all ExpenseCategories as a tree structure
        const expenseCategories = await ExpenseCategories.findAll();
        const categoryTree = buildCategoryTree(expenseCategories);
        res.status(200).json(categoryTree);
      } else {
        // Get all ExpenseCategories
        const expenseCategories = await ExpenseCategories.findAll();
        res.status(200).json(expenseCategories);
      }
    } catch (error) {
      console.error('Error getting ExpenseCategories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific ExpenseCategory by ID
const getExpenseCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const expenseCategory = await ExpenseCategories.findByPk(categoryId);
    if (!expenseCategory) {
      res.status(404).json({ error: 'ExpenseCategory not found' });
      return;
    }
    res.status(200).json(expenseCategory);
  } catch (error) {
    console.error('Error getting ExpenseCategory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an ExpenseCategory by ID
const updateExpenseCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const [updatedRows] = await ExpenseCategories.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedRows === 0) {
      res.status(404).json({ error: 'ExpenseCategory not found' });
      return;
    }

    const updatedExpenseCategory = await ExpenseCategories.findByPk(categoryId);
    res.status(200).json(updatedExpenseCategory);
  } catch (error) {
    console.error('Error updating ExpenseCategory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an ExpenseCategory by ID
const deleteExpenseCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedRowCount = await ExpenseCategories.destroy({
      where: { id: categoryId },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'ExpenseCategory not found' });
      return;
    }

    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    console.error('Error deleting ExpenseCategory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createExpenseCategory,
  getAllExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategoryById,
  deleteExpenseCategoryById,
};
