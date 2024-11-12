import express from "express";
import { uploadFile, readFile, readDates } from "../controllers/fileController";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post("/upload", asyncHandler(uploadFile));
router.get("/read-file", asyncHandler(readFile));
router.get("/get-dates", asyncHandler(readDates));

export default router;