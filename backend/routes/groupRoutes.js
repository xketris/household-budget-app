import Router from "express";
import { addGroup, getGroup } from "../controllers/groupController";

const router = Router();

router.use(validateToken);

router.route("/")
    .get()
    .post(addGroup)

router.route("/:id")
    .get(getGroup)
    .put()
    .delete()

export default router;