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