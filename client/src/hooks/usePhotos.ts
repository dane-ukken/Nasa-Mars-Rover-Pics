import { useQuery } from '@tanstack/react-query';
import { marsPhotosApi } from '../services/api/marsPhotosApi';
import { PhotoResponse } from '../types/api';

export const useRoverPhotos = (rover: string, date: string) => {
  return useQuery<PhotoResponse, Error>({
    queryKey: ['photos', rover, date],
    queryFn: () => marsPhotosApi.getPhotosByRoverAndDate(rover, date),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: date !== '',
  }); 
}; 