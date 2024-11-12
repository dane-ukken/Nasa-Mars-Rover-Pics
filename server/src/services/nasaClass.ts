import axios from 'axios';
import { RoverApiResponse, PhotosApiResponse, ResponsePhoto, Photo } from '../types/rover';
import { downloadImage } from '../utils/imageUtils';

export class NasaApiService {
    private baseUrl: string;
    private apiKey: string;

    constructor() {
        this.baseUrl = process.env.BASE_URL || '';
        this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    }

    async getRovers(): Promise<RoverApiResponse> {
        const url = `${this.baseUrl}/rovers?api_key=${this.apiKey}`;
        const response = await axios.get<RoverApiResponse>(url);
        return response.data;
    }

    async getRoverPhotos(rover: string, page: string, date: string): Promise<ResponsePhoto[]> {
        const earthDate = date || '';
        const url = `${this.baseUrl}/rovers/${rover}/photos?page=${page}&api_key=${this.apiKey}&earth_date=${earthDate}`;
        
        const response = await axios.get<PhotosApiResponse>(url);
        return response.data.photos.map((photo: Photo) => ({
            id: photo.id,
            img_src: photo.img_src,
            camera: photo.camera.name
        }));
    }

    async downloadImage(imageUrl: string, rover: string, date: string, camera: string, id: number): Promise<string> {
        const savedPath = await downloadImage(imageUrl, rover, date, camera, id);
        return savedPath;
    }
}