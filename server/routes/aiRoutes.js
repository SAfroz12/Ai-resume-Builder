import express from "express";
import { analyzeResume ,  extractResume} from "../controllers/aiController.js";
const router = express.Router();
router.post("/analyze", analyzeResume);
router.post("/extract", extractResume);
export default router;