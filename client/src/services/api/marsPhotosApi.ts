import { axiosInstance } from './config';
import { PhotoResponse, RoverResponse } from '../../types/api';

export const marsPhotosApi = {
  getPhotosByRoverAndDate: async (rover: string, date: string): Promise<PhotoResponse> => {
    const { data } = await axiosInstance.get<PhotoResponse>(`/rovers/images?rover=${rover}&date=${date}`);
    return data;
  },
  getRovers: async (): Promise<RoverResponse> => {
    const { data } = await axiosInstance.get<RoverResponse>('/rovers');
    return data;
  }
}; 