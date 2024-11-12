import { axiosInstance } from './config';
import { DateData } from '../../types/dates';

export const fileApi = {
    getDates: async (): Promise<DateData> => {
        const { data } = await axiosInstance.get<DateData>('/file/get-dates');
        return data;
    }
}