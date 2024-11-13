import axios from 'axios';
import { RoverApiResponse, PhotosApiResponse, ResponsePhoto, Photo } from '../types/rover';
import { buildImageUrl, downloadImage } from '../utils';
import { NASA_API } from '../constants';

const BASE_URL = NASA_API.BASE_URL;
const API_KEY = NASA_API.API_KEY;

export const getRovers = async (): Promise<RoverApiResponse> => {
    const url = `${BASE_URL}/rovers?api_key=${API_KEY}`;
    const response = await axios.get<RoverApiResponse>(url);
    return response.data;
};

export const getRoverPhotos = async (
    rover: string, 
    page: string, 
    date: string
): Promise<ResponsePhoto[]> => {
    const earthDate = date || '';
    const url = `${BASE_URL}/rovers/${rover}/photos?page=${page}&api_key=${API_KEY}&earth_date=${earthDate}`;
    
    const response = await axios.get<PhotosApiResponse>(url);
    return response.data.photos.map((photo: Photo) => ({
        id: photo.id,
        img_src: buildImageUrl(rover, date, photo.camera.name, photo.id, photo.img_src),
        camera: photo.camera.name,
        cameraFullName: photo.camera.full_name
    }));
};

export const downloadImageFromNasa = async (imageUrl: string, rover: string, date: string, camera: string, id: number): Promise<string> => {
    return await downloadImage(imageUrl, rover, date, camera, id);
};
