import { Request, Response } from "express";
import { parseDatesFromFile  } from "../services/fileService";
import { DOWNLOAD_PATH, FILE_PATH } from "../constants";
import { downloadNasaImage } from "../services/nasaService";
import { cleanupOldFiles } from '../services/fileService';
import { createError } from '../middlewares/errorHandler';

export const readDates = async (req: Request, res: Response) => {
    res.json({ dates: await parseDatesFromFile(FILE_PATH) });
}

export const getImage = (async (req: Request, res: Response) => {
    const { rover, date, camera, id } = req.params;
    const { img_src } = req.query;

    if (!rover || !date || !camera || !id) {
        throw createError('Missing required parameters', 400, 'VALIDATION_ERROR');
    }

    if (!img_src || typeof img_src !== 'string') {
        throw createError('Image URL is required', 400, 'VALIDATION_ERROR');
    }

    const filePath = await downloadNasaImage(img_src, rover, date, camera, id);
    res.sendFile(filePath, { root: '.' });
});

export const cleanupImages = async (req: Request, res: Response) => {
    try {
        await cleanupOldFiles(DOWNLOAD_PATH.BASE, 24); 
        res.json({ message: 'Image cleanup completed successfully' });
    } catch (error) {
        throw createError(
            'Failed to cleanup images',
            500,
            'CLEANUP_ERROR'
        );
    }
};