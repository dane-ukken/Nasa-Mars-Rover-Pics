import { Request, Response } from "express";
import { getRovers, getRoverPhotos } from "../services/nasaService";

export const getAllRovers = async (req: Request, res: Response) => {
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