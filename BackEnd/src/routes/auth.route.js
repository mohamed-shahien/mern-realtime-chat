import expreess from "express";
import { login, logout, signup , apdateProfile, checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.medleware.js";
const router = expreess.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.put("/update-profile", protectRoute, apdateProfile)
router.get("/check", protectRoute, checkAuth)
export default router;