import express from "express";
import { readDates } from "../controllers/fileController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get("/dates", asyncHandler(readDates));

export default router;