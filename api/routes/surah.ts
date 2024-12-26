import express from "express";
import colors from "colors";
import { checkAuthStatus } from "../middleware/checkAuthStatus";
import { saveProgress } from "../controllers/surah";

const router = express.Router();

colors.enable();

router.post('/save-progress', checkAuthStatus, saveProgress);

export default router;
