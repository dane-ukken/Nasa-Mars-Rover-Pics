import express from "express";
import { readDates } from "../controllers/fileController";
import { asyncHandler } from "../utils";

const router = express.Router();

router.get("/dates", asyncHandler(readDates));

export default router;