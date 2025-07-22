import Router from "express";
import { addCategory, getCategories } from "../controllers/categoryController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.use(validateToken);

router.route("/")
    .get(getCategories)
    .post(addCategory);

export default router;