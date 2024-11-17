import express from "express";
import { googleAuth, signUp, signIn, signOut } from "../controllers/auth-related/authentication";
import { verifyEmail, resetPassword, updatePassword } from "../controllers/auth-related/handlers";
const router = express.Router();

router.post("/sign-in/google", googleAuth);
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', resetPassword);
router.post("/sign-out", signOut);
router.post("/reset-password/:token", updatePassword);

export default router;
