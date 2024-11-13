export type Photo ={
  id: number;
  img_src: string;
  camera: string;
  cameraFullName: string;
}

export type PhotoResponse = {
  rover: string;
  date: string;
  photos: Photo[];
}

export type ErrorResponse = {
  message: string;
  status: number;
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
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: RoverCamera[];
}

export type RoverResponse = {
  rovers: Rover[];
}