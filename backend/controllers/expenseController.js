const Expense = require("../models/expense");

exports.createExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body;

        const expense = await Expense.create({
            amount,
            description,
            category
        });

        res.status(201).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to create expense"
        });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();

        res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to get expenses"
        });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json(expense);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Unable to get expense"
        });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await expense.destroy();

        res.status(200).json({
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to delete expense"
        });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, description, category } = req.body;

        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await expense.update({
            amount,
            description,
            category
        });

        res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to update expense"
        });
    }
};