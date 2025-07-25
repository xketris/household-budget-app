import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js"
import Group from "../models/groupModel.js"

const addExpense = asyncHandler(async (req, res) => {
    const { amount, description, category, groupId } = req.body;
    if(!amount || !category) {
        res.status(400);
        throw new Error("Amount is required");
    }

    const expense = await Expense.create({
        amount, 
        description, 
        createdBy: req.user.id, 
        category, 
        groupId
    });

    if(expense) {
        res.status(201).json({
            _id: expense._id,
            amount: expense.amount, 
            description: expense.description, 
            createdBy: expense.createdBy,
            category: expense.category,
            groupId: expense.groupId
        });
    } else {
        res.status(400);
        throw new Error("expense data is invalid");
    }
});

const getExpenses = asyncHandler(async (req, res) => {
    const groupId = req.params.groupId;
    if(groupId) {
        res.status(200).json(await Expense.find({ groupId }));
    }
    res.status(200).json(await Expense.find({ createdBy: req.user.id }));
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
    if(expense.createdBy.toString() !== req.user.id) {
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

    if(expense.createdBy.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete others expenses");
    }

    await Expense.deleteOne({_id: req.params.id});
    res.status(200).json(expense);
});

export { addExpense, getExpenses, getExpense, deleteExpense, updateExpense };