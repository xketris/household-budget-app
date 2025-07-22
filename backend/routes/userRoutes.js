import Router from "express";
import { registerUser, loginUser, currentUser } from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/current", currentUser);

export default router;