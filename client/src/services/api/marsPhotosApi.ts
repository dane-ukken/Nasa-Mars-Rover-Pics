import { axiosInstance } from './config';
import { PhotoResponse } from '../../types/api';

export const marsPhotosApi = {
  getPhotosByRoverAndDate: async (rover: string, date: string): Promise<PhotoResponse> => {
    const { data } = await axiosInstance.get<PhotoResponse>(`/rovers/image-list?rover=${rover}&date=${date}`);
    return data;
  },
  savePhotoToServer: async (imageUrl: string, camera: string, id: string, rover: string, date: string) => {
    const { data } = await axiosInstance.post<PhotoResponse>('/rovers/save-image', { imageUrl, camera, id, rover, date });
    return data;
  }
}; 