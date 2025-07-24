import Router from "express";
import { addGroup, getGroup, getGroups, updateGroup, deleteGroup } from "../controllers/groupController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.use(validateToken);

router.route("/")
    .post(addGroup)
    .get(getGroups)

router.route("/:id")
    .get(getGroup)
    .put(updateGroup)
    .delete(deleteGroup)

export default router;