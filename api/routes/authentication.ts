import express from "express";
import { googleAuth, signUp, verifyEmail, signIn } from "../controllers/authentication";
const router = express.Router();

router.post("/sign-in/google", googleAuth);
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post('/verify-email', verifyEmail);

export default router;
