import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js"

const addExpense = asyncHandler(async (req, res) => {
    const { amount, description, category, group_id } = req.body;
    if(!amount) {
        res.status(400);
        throw new Error("Amount is required");
    }

    const expense = await Expense.create({
        amount, 
        description, 
        created_by: req.user._id, 
        category, 
        group_id
    });

    if(expense) {
        res.status(201).json({
            _id: expense._id,
            amount: expense.amount, 
            description: expense.description, 
            created_by: expense.created_by,
            category: expense.category,
            group_id: expense.group_id
        });
    } else {
        res.status(400);
        throw new Error("expense data is invalid");
    }
});

const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ created_by: req.user.id });
    res.status(200).json(expenses);
});

const getExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if(expense.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to change others expenses")
    }

    res.status(200).json(expense);
});

const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(!expense) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedExpense);
});

const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(!expense) {
        res.status(404);
        throw new Error("Expense not found");
    }

    if(expense.created_by.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete others expenses");
    }

    await Expense.deleteOne({_id: req.params.id});
    res.status(200).json(expense);
});

export { addExpense, getExpenses, getExpense, deleteExpense, updateExpense };