import { Request, Response } from "express";
import { parseDatesFromFile } from "../services/fileService";
import { FILE_PATH } from "../constants";
import { handleFileOperation } from "../utils/controllerUtils";
import { ImageListForRover, Rover } from "../types/rover";
import { getRoverPhotos } from "../services/nasaService";
import rovers from "../../public/rovers.json";

export const readDates = async (req: Request, res: Response) => {
    res.json({ dates: await parseDatesFromFile(FILE_PATH) });
}

export const uploadFile = async (req: Request, res: Response) => {
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).json({ error: 'File name is required' });
    }

    await handleFileOperation(res, () => parseDatesFromFile(fileName));
};


const processRoverData = async (rover: Rover, date: string): Promise<ImageListForRover> => {
    const photos = await getRoverPhotos(rover.name, '1', date);
    return {
        id: rover.id,
        name: rover.name,
        images: photos
    };
};

export const readFile = async (req: Request, res: Response) => {
    const result = await handleFileOperation(res, () => parseDatesFromFile(FILE_PATH));

    if (result.success === false || !result.data) {
        return res.status(400).json(result);
    }

    if (result.data.length === 0) {
        return res.json({ error: 'No valid dates found in file' });
    }

    const allPromises = result.data.flatMap(date => 
        rovers.rovers.map(rover => 
            processRoverData(rover as Rover, date)
                .then(roverData => ({ date, roverData }))
        )
    );

    const results = await Promise.all(allPromises);

    const dateMap = results.reduce((acc, { date, roverData }) => {
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(roverData);
        return acc;
    }, {} as Record<string, ImageListForRover[]>);

    const dates = Object.entries(dateMap).map(([date, rovers]) => ({
        date,
        rovers
    }));

    res.json({ dates });
};