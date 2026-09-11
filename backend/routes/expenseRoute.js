const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");

router.post("/expenses", expenseController.createExpense);
router.get("/expenses", expenseController.getExpenses);
router.delete("/expenses/:id", expenseController.deleteExpense);
router.put("/expenses/:id", expenseController.updateExpense);
router.get("/expenses/:id", expenseController.getExpenseById);

module.exports = router;