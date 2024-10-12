import express from "express";
import { googleAuth, signUp } from "../controllers/authentication";
const router = express.Router();

router.post("/sign-in/google", googleAuth);
router.post("/sign-up", signUp);

export default router;
