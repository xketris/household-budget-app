import Router from "express";
import { registerUser, loginUser, currentUser } from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/current", validateToken, currentUser);

export default router;