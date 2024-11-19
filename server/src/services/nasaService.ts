import axios, { AxiosError } from 'axios';
import { logger } from '../middlewares/logger';
import { buildFileName, buildFilePath, buildImageUrl, isReadableStream } from '../utils/fileUtils';
import { IMAGE_EXTENSION, NASA_API } from '../constants';
import { Photo } from '../types/rover';
import { PhotosApiResponse, ResponsePhoto, RoverApiResponse } from '../types/rover';
import { createError } from '../middlewares/errorHandler';
import fs from 'fs';
import { fileExists } from './fileService';
import { promisify } from 'util';
import Stream from 'stream';
import path from 'path';

const pipeline = promisify(Stream.pipeline);

export async function getRovers(): Promise<RoverApiResponse> {
    try {
        const url = `${NASA_API.BASE_URL}/rovers?api_key=${NASA_API.API_KEY}`;
        const response = await axios.get<RoverApiResponse>(url);
        return response.data;
    } catch (error) {
        throw createError(
            'Failed to fetch rovers data', 
            500, 
            'NASA_API_ERROR'
        );
    }
};

export async function downloadNasaImage(
    url: string,
    rover: string,
    date: string,
    camera: string,
    photoId: string
): Promise<string> {
    try {
        const fileName = buildFileName(rover, date, camera, photoId, IMAGE_EXTENSION);
        const dirPath = buildFilePath(fileName);
        fs.mkdirSync(dirPath, { recursive: true });
        const filePath = path.join(dirPath, fileName);

        const exists = await fileExists(filePath);
        if (exists) {
            logger.info(`File already exists: ${filePath}`);
            return filePath;
        }
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'stream'
        });

        if (!response.data || !isReadableStream(response.data)) {
            throw new Error('Invalid response data or not a stream.');
        }

        const writer = fs.createWriteStream(filePath);

        await pipeline(response.data as unknown as NodeJS.ReadableStream, writer);
        return filePath;
    } catch (error: any) {
        throw createError(
            `Failed to download image: ${error.message || error}`,
            500,
            'DOWNLOAD_ERROR'
        );
    }
}

export async function getRoverPhotos(
    rover: string,
    page: string,
    date: string
): Promise<ResponsePhoto[]> {
    try {
        const response = await axios.get<PhotosApiResponse>(
            `${NASA_API.BASE_URL}/rovers/${rover}/photos`, {
                params: {
                    page,
                    api_key: NASA_API.API_KEY,
                    earth_date: date
                }
            }
        );
        return response.data.photos.map((photo: Photo) => ({
            id: photo.id,
            img_src: buildImageUrl(rover, date, photo.camera.name, photo.id, photo.img_src),
            camera: photo.camera.name,
            cameraFullName: photo.camera.full_name
        }));
    } catch (error) {
        if (error instanceof AxiosError) {
            logger.error('Failed to fetch rover photos:', {
                rover,
                date,
                error: error instanceof Error ? error.message : String(error)
            });

            if (error.response?.status === 404) {
                throw createError(
                    'No photos found for the specified date and rover',
                    404,
                    'NASA_API_ERROR'
                );
            }
            if (error.code === 'ECONNABORTED') {
                throw createError(
                    'Request timeout while fetching rover photos',
                    503,
                    'NASA_API_ERROR'
                );
            }
        }
        
        throw createError(
            'Failed to fetch rover photos',
            500,
            'NASA_API_ERROR'
        );
    }
}