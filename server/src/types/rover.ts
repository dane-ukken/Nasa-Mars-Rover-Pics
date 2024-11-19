export interface Camera {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
}

export interface Rover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: 'active' | 'complete' | 'inactive';
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: Camera[];
}

export interface Photo {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}

export interface FormattedPhoto {
    id: number;
    img_src: string;
    camera: string;
    cameraFullName: string;
    localUrl?: string;
}

export interface RoverApiResponse {
    rovers: Rover[];
}

export interface PhotosApiResponse {
    photos: Photo[];
}

export type ResponsePhoto = {
    id: number;
    img_src: string;
    camera: string;
    cameraFullName: string;
}