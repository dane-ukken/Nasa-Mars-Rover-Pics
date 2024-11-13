import { Request, Response } from "express";
import { getRovers, getRoverPhotos, downloadImageFromNasa } from "../services/nasaService";

export const getAllRovers = async (res: Response) => {
    const data = await getRovers();
    res.json(data);
};

export const getRoverImageList = async (req: Request, res: Response) => {
    const { rover, page, date } = req.query;
    const photos = await getRoverPhotos(
        rover as string,
        page as string,
        date as string
    );
    res.json({ rover: rover, date: date, photos: photos});
};

export const saveRoverImage = async (req: Request, res: Response) => {
    const { imageUrl, rover, date, camera, id } = req.body;
    
    if (!imageUrl || !rover || !date || !camera || !id) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const savedPath = await downloadImageFromNasa(imageUrl, rover, date, camera, id);
    res.json({ success: true, path: savedPath });
};