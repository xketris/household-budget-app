import Router from "express";
import { registerUser, loginUser, currentUser, refreshAccessToken, updateUser } from "../controllers/authController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/current", validateToken, currentUser);
router.put("/current", validateToken, updateUser);

export default router;