import Router from "express";
import { registerUser, loginUser, currentUser, refreshAccessToken } from "../controllers/authController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/current", validateToken, currentUser);

export default router;