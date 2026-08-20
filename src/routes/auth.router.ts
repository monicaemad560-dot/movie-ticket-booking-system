import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { reservation } from "../controllers/auth.controller.js";
const router = Router();

router.post("/",reservation)
router.post("/register", register);
router.post("/login", login);

export default router;