import Router from "express";
import { addGroup, getGroup } from "../controllers/groupController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.use(validateToken);

router.route("/")
    .post(addGroup)

router.route("/:id")
    .get(getGroup)

export default router;