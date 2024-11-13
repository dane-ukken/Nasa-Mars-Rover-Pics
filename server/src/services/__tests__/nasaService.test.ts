import axios from 'axios';
import { getRovers, getRoverPhotos, downloadImageFromNasa } from '../nasaService';
import { downloadImage } from '../../utils';
import { NASA_API } from '../../constants';
import { 
    MOCK_ROVERS, 
    MOCK_PHOTOS, 
    MOCK_RESPONSES,
    MOCK_DOWNLOADS,
    MOCK_DATES,
    TEST_CONFIG 
} from '../../tests/constants/testData';

jest.mock('axios');
jest.mock('../../utils');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedDownloadImage = downloadImage as jest.MockedFunction<typeof downloadImage>;

describe('Rover Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getRovers', () => {
        it('should fetch rovers successfully', async () => {
            const mockResponse = {
                ...MOCK_RESPONSES.SUCCESS_RESPONSE,
                data: MOCK_ROVERS.ROVERS_RESPONSE,
                config: {
                    url: `${NASA_API.BASE_URL}/rovers?api_key=${NASA_API.API_KEY}`
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await getRovers();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${NASA_API.BASE_URL}/rovers?api_key=${NASA_API.API_KEY}`
            );
            expect(result).toEqual(MOCK_ROVERS.ROVERS_RESPONSE);
        });

        it('should handle API errors', async () => {
            const error = new Error('API Error');
            mockedAxios.get.mockRejectedValueOnce(error);

            await expect(getRovers()).rejects.toThrow('API Error');
        });
    });

    describe('getRoverPhotos', () => {
        it('should fetch rover photos successfully', async () => {
            const mockResponse = {
                ...MOCK_RESPONSES.SUCCESS_RESPONSE,
                data: MOCK_PHOTOS.PHOTOS_RESPONSE,
                config: { url: 'test-url' }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await getRoverPhotos(
                MOCK_DOWNLOADS.ROVER_NAME,
                '1',
                MOCK_DATES.VALID_DATE
            );

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${NASA_API.BASE_URL}/rovers/${MOCK_DOWNLOADS.ROVER_NAME}/photos?page=1&api_key=${NASA_API.API_KEY}&earth_date=${MOCK_DATES.VALID_DATE}`
            );
            expect(result).toEqual(MOCK_PHOTOS.FORMATTED_PHOTOS);
        });

    });

    describe('downloadImageFromNasa', () => {
        it('should download image successfully', async () => {
            mockedDownloadImage.mockResolvedValueOnce(MOCK_DOWNLOADS.SAVED_PATH);

            const result = await downloadImageFromNasa(
                MOCK_DOWNLOADS.IMAGE_URL,
                MOCK_DOWNLOADS.ROVER_NAME,
                MOCK_DATES.VALID_DATE,
                MOCK_DOWNLOADS.CAMERA_NAME,
                MOCK_DOWNLOADS.PHOTO_ID
            );

            expect(mockedDownloadImage).toHaveBeenCalledWith(
                MOCK_DOWNLOADS.IMAGE_URL,
                MOCK_DOWNLOADS.ROVER_NAME,
                MOCK_DATES.VALID_DATE,
                MOCK_DOWNLOADS.CAMERA_NAME,
                MOCK_DOWNLOADS.PHOTO_ID
            );
            expect(result).toBe(MOCK_DOWNLOADS.SAVED_PATH);
        });

    });
});