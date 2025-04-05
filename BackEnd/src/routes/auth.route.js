import expreess from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = expreess.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
export default router;