import express from "express";
import { googleAuth } from "../controllers/authentication";
const router = express.Router();

router.post("/sign-in/google", googleAuth);

export default router;
