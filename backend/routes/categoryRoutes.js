import Router from "express";
import { addCategory, getCategories } from "../controllers/categoryController.js";

const router = Router();

router.route("/")
    .get(getCategories)
    .post(addCategory);

export default router;