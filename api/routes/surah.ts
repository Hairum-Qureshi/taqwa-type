import express from "express";
import colors from "colors";
import { checkAuthStatus } from "../middleware/checkAuthStatus";
import { saveProgress, saveSectionProgress } from "../controllers/surah";

const router = express.Router();

colors.enable();

router.post('/save-progress', checkAuthStatus, saveProgress);
router.post('/save-progress/section/:section_no', checkAuthStatus, saveSectionProgress);

export default router;
