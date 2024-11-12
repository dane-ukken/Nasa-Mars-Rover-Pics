export type Camera = {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  }
  
export type RoverCamera = {
    name: string;
    full_name: string;
}
  
export type Rover = {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: 'active' | 'inactive' | 'complete';
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: RoverCamera[];
}

export type Photo = {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}
  
export type RoverApiResponse = {
    rovers: Rover[];
}
  
export type PhotosApiResponse = {
    photos: Photo[];
}

export type ResponsePhoto = {
    id: number;
    img_src: string;
    camera: string;
    cameraFullName: string;
}

export type ImageListResponse = {
    photos: ResponsePhoto[];
}

export type RoverConfigList = {
    rovers: Rover[];
}

export type ImageListForRover = {
    id: number;
    name: string;
    images: ResponsePhoto[];
}

export type ImageListForDatePerRover = {
    date: string;
    rovers: ImageListForRover[];
}

export type ImageListForFile = {
    dates: ImageListForDatePerRover[];
}