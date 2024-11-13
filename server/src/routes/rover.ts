import express from "express";
import { getAllRovers, getRoverImageList } from "../controllers/roverController";
import { asyncHandler } from "../utils";

const router = express.Router();

router.get("/", asyncHandler(getAllRovers));
router.get("/images", asyncHandler(getRoverImageList));

export default router;