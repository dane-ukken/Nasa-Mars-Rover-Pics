import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Stream } from 'stream';
import { DOWNLOAD_PATH, GET_METHOD, STREAM_RESPONSE_TYPE, IMAGE_EXTENSION, DEFAULT_IMAGE_FILE_NAME } from '../constants';
import { isReadableStream } from './fileUtils';

const pipeline = promisify(Stream.pipeline);

export const downloadImage = async (
    imageUrl: string, 
    roverName: string, 
    earthDate: string, 
    camera: string,
    id: number
): Promise<string> => {
    try {
        const response = await axios({
            url: imageUrl,
            method: GET_METHOD,
            responseType: STREAM_RESPONSE_TYPE
        });

        if (!response.data || !isReadableStream(response.data)) {
            throw new Error('Invalid response data or not a stream.');
        }

        const dirPath = DOWNLOAD_PATH.getImagePath(roverName, earthDate, camera);
        fs.mkdirSync(dirPath, { recursive: true });

        const fileName = path.basename(id.toString() + IMAGE_EXTENSION) || DEFAULT_IMAGE_FILE_NAME;
        const filePath = path.join(dirPath, fileName);

        const writer = fs.createWriteStream(filePath);

        await pipeline(response.data as unknown as NodeJS.ReadableStream, writer);
        return filePath;
    } catch (error: any) {
        throw new Error(`Failed to download image: ${error.message || error}`);
    }
};