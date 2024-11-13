import { Request, Response } from "express";
import { parseDatesFromFile  } from "../services/fileService";
import { FILE_PATH, IMAGE_EXTENSION, DOWNLOAD_PATH } from "../constants";
import path from "path";
import fs from "fs";
import { downloadImageFromNasa } from "../services/nasaService";
import { getRoverPhotos } from "../services/nasaService";

export const readDates = async (req: Request, res: Response) => {
    res.json({ dates: await parseDatesFromFile(FILE_PATH) });
}

export const getImage = async (req: Request, res: Response) => {
    const { rover, date, camera, id } = req.params;
    const { img_src } = req.query;
    
    const imagePath = path.join(
        DOWNLOAD_PATH.getImagePath(rover, date, camera),
        `${id}${IMAGE_EXTENSION}`
    );

    if (!fs.existsSync(imagePath)) {
        try {
            await downloadImageFromNasa(
                img_src as string,
                rover,
                date,
                camera,
                parseInt(id)
            );
        } catch (error) {
            return res.status(500).json({ 
                error: 'Failed to download image',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    res.sendFile(imagePath);
};