import Router from "express";
import { addExpense, deleteExpense, getExpense, getExpenses, updateExpense } from "../controllers/expenseController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.use(validateToken);

router.route("/")
    .get(getExpenses)
    .post(addExpense)

router.route("/:expenseId")
    .get(getExpense)
    .put(updateExpense)
    .delete(deleteExpense)

export default router;