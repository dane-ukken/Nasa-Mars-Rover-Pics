import express from "express";
import { getImage, readDates } from "../controllers/fileController";
import { asyncHandler } from "../utils";

const router = express.Router();

router.get("/dates", asyncHandler(readDates));
router.get("/image/:rover/:date/:camera/:id", asyncHandler(getImage));

export default router;