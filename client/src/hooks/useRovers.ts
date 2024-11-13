import { useQuery } from '@tanstack/react-query';
import { marsPhotosApi } from '../services/api/marsPhotosApi';
import { RoverResponse } from '../types/api';

export const useRovers = () => {
  return useQuery<RoverResponse, Error>({
    queryKey: ['rovers'],
    queryFn: () => marsPhotosApi.getRovers(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};