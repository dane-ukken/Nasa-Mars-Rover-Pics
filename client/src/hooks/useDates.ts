import { useQuery } from '@tanstack/react-query';
import { fileApi } from '../services/api/fileApi';
import { DateData } from '../types/dates';

export const useDates = () => {
    return useQuery<DateData, Error>({
        queryKey: ['dates', 'read-file'],
        queryFn: () => fileApi.getDates(),
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}