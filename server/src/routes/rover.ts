import express from "express";
import { getAllRovers, getRoverImageList, saveRoverImage } from "../controllers/roverController";
import { asyncHandler } from "../utils";

const router = express.Router();

router.get("/", asyncHandler(getAllRovers));
router.get("/images", asyncHandler(getRoverImageList));
router.post("/save-image", asyncHandler(saveRoverImage));

export default router;