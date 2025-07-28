import Router from "express";
import { addExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controllers/expenseController.js";

const router = Router();

router.route("/")
    .get(getExpenses)
    .post(addExpense)

router.route("/:expenseId")
    .get(getExpense)
    .put(updateExpense)
    .delete(deleteExpense)

export default router;