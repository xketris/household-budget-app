import Router from "express";
import { addExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controllers/expenseController";

const router = Router();

router.use(validateToken);

router.route("/")
    .get(getExpenses)
    .post(addExpense)

router.route("/:id")
    .get(getExpense)
    .put(updateExpense)
    .delete(deleteExpense)

export default router;