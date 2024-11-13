import { Request, Response } from "express";
import { parseDatesFromFile  } from "../services/fileService";
import { FILE_PATH } from "../constants";
import { getRovers } from "../services/nasaService";

export const readDates = async (req: Request, res: Response) => {
    res.json({ dates: await parseDatesFromFile(FILE_PATH) });
}
