import Router from "express";
import { addGroup, getGroup, getGroups, updateGroup, deleteGroup } from "../controllers/groupController.js";
import { getGroupExpenses } from "../controllers/expenseController.js";

const router = Router();

router.route("/")
    .post(addGroup)
    .get(getGroups)

router.route("/:groupId")
    .get(getGroup)
    .put(updateGroup)
    .delete(deleteGroup)

router.route("/:groupId/expenses")
    .get(getGroupExpenses)

export default router;