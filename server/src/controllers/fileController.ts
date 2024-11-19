import { Request, Response } from "express";
import { parseDatesFromFile  } from "../services/fileService";
import { FILE_PATH } from "../constants";
import { downloadNasaImage } from "../services/nasaService";
import { cleanupOldFiles } from '../services/fileService';
import { createError } from '../middlewares/errorHandler';

export const readDates = async (req: Request, res: Response) => {
    res.json({ dates: await parseDatesFromFile(FILE_PATH) });
}

export const getImage = (async (req: Request, res: Response) => {
    const { rover, date, camera, id } = req.params;
    const { img_src } = req.query;

    if (!img_src || typeof img_src !== 'string') {
        throw createError('Image URL is required', 400, 'VALIDATION_ERROR');
    }
    
    const filePath = await downloadNasaImage(img_src, rover, date, camera, id);
    res.sendFile(filePath, { root: '.' });
   
});

export const cleanup = async (_req: Request, res: Response) => {
    await cleanupOldFiles('public/downloads', 24);
    res.json({ message: 'Cleanup completed successfully' });
}