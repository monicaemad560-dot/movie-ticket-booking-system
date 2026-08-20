import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { reservation,getAll } from "../controllers/auth.controller.js";
const router = Router();


router.get("/",getAll)
router.patch("/",reservation)
router.post("/register", register);
router.post("/login", login);

export default router;